import traverse from "json-schema-traverse";

import $head from "bundle-text:./ft-head.clar.template";
import $body from "bundle-text:./ft-body.clar.template";
import $updateSetting from "bundle-text:../../templates/components/update-owner-only-setting.clar.template";

import schema from "./contract-settings-ft.schema.json";

import t, { ContractVariable } from "../../util/t";
import { getProp } from "../../util/literal";
import type { AllowedErrors } from "../../util/errors";
import type { ContractSettings } from "../../types/contract-settings";
import type { FTTemplateSettings } from "../../types/contract-settings-ft.schema";
import { getClarityValue } from "../../util/clarity";
import { toUpperSnake } from "../../util/string";

type UpdatableField = { value: string | number; updatable?: boolean };

export default function buildFtSettings(userSettings: FTTemplateSettings) {
  const warnings: string[] = [];
  const { general, mint } = userSettings;

  /* INIT */
  const errors: AllowedErrors = ["ERR_NOT_TOKEN_OWNER"];

  const dataVars: ContractSettings["dataVars"] = [
    { name: "artist-address", type: "principal", value: "tx-sender" },
    { name: "last-token-id", type: "uint", value: "u0" },
  ];

  const constants: ContractSettings["constants"] = [];

  const maps: ContractSettings["maps"] = [];

  /* DATA-VAR and CONSTANTS */
  const contractVariables: ContractVariable[] = [];

  traverse(schema, {
    allKeys: true,
    cb: (schema, pointer) => {
      if (schema.type !== "object") return;
      if (
        !schema.properties.hasOwnProperty("value") ||
        !schema.properties.hasOwnProperty("updatable")
      ) {
        return;
      }

      const path: string[] = pointer
        .replace(/\/(properties|definitions)/g, "")
        .toLowerCase()
        .split("/")
        .filter((p) => !!p);
      const name = path.at(-1)!;
      if (!schema.properties.value.hasOwnProperty("clarityType")) {
        throw new Error("Missing clarity type");
      }
      const type = schema.properties.value.clarityType;

      const setting = getProp<UpdatableField>(userSettings, path);
      if (!setting) return;

      const initialValue = getClarityValue(type, setting.value);

      contractVariables.push({
        name,
        isConst: !setting.updatable,
        canBeFrozen: schema.canBeFrozen,
        type,
        initialValue,
      });
    },
  });
  // collect constants, data-var and update functions
  const updateSettingsFunctions: string[] = [];
  for (const contractVar of contractVariables) {
    const { name, initialValue, type } = contractVar;
    if (contractVar.isConst) {
      constants.push({ name: toUpperSnake(name), value: initialValue });
    } else {
      dataVars.push({
        name,
        type,
        value: initialValue,
      });
      updateSettingsFunctions.push(
        t(
          $updateSetting,
          {
            ["var-name"]: name,
            ["can-be-frozen"]: contractVar.canBeFrozen,
            type,
          },
          { variables: contractVariables }
        )
      );
    }
  }

  /* MINT LIMIT */
  const hasMintLimit = !!mint?.["mint-limit"];
  if (hasMintLimit) {
    errors.push("ERR_REACHED_MINT_LIMIT");
    maps.push({ name: "mint-count", keyType: "principal", valueType: "uint" });
  }

  /* BUILD SETTINGS */
  const baseSettings: ContractSettings = {
    traits: [
      "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait",
    ],
    constants,
    errors,
    dataVars,
    maps,
    templateHead: t($head, { name: general.name }),
    templateBody: t(
      $body,
      {
        name: general.name,
        ["update-settings-functions"]: updateSettingsFunctions.join("\n\n"),
        ["has-mint-limit"]: hasMintLimit,
      },
      { variables: contractVariables }
    ),
  };

  return {
    settings: baseSettings,
    warnings,
    userSettings: { general, mint },
  };
}

export function validateSettings(
  settings: any
): settings is FTTemplateSettings {
  if (settings.template !== "ft") throw new Error("invalid template type");
  // @todo
  return true;
}
