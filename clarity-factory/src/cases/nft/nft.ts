import traverse from "json-schema-traverse";

import $head from "bundle-text:./nft-head.clar.template";
import $body from "bundle-text:./nft-body.clar.template";
import $updateSetting from "bundle-text:../../templates/components/update-owner-only-setting.clar.template";
import $mapInsert from "bundle-text:../../templates/components/map-insert.clar.template";

import schema from "./contract-settings-ui.schema.json";

import t, { ContractVariable } from "../../util/t";
import { getProp } from "../../util/literal";
import type { AllowedErrors } from "../../util/errors";
import type { ContractSettings } from "../../types/contract-settings";
import type { NFTTemplateSettings } from "../../types/contract-settings-ui.schema";
import { getClarityValue } from "../../util/clarity";
import { toUpperSnake } from "../../util/string";

type UpdatableField = { value: string | number; updatable?: boolean };

export default function buildNftSettings(userSettings: NFTTemplateSettings) {
  const errors: AllowedErrors = ["ERR_NOT_TOKEN_OWNER"];

  const contractOwner = userSettings.general["contract-owner"]?.value;
  if (contractOwner) {
    errors.push("ERR_NOT_CONTRACT_OWNER");
  }

  const dataVars: ContractSettings["dataVars"] = [
    { name: "artist-address", type: "principal", value: "tx-sender" },
    { name: "last-token-id", type: "uint", value: "u0" },
  ];

  const constants: ContractSettings["constants"] = [];

  const maps: ContractSettings["maps"] = [];

  // DATA-VAR and CONSTANS
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

      if (setting.updatable && !contractOwner) {
        throw new Error("The ContractOwner is required");
      }

      contractVariables.push({
        name,
        isConst: !setting.updatable,
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
          { ["var-name"]: name, type },
          { variables: contractVariables }
        )
      );
    }
  }

  /* MINT LIMIT */
  const hasMintLimit = !!userSettings.mint?.["mint-limit"]?.value;
  if (hasMintLimit) {
    errors.push("ERR_REACHED_MINT_LIMIT");
    maps.push({ name: "mint-count", keyType: "principal", valueType: "uint" });
  }

  /* ALLOW LIST */
  const hasAllowList = !!userSettings.mint?.["allow-list"];
  if (hasAllowList) {
    errors.push("ERR_UNAUTHORIZED");
    maps.push({ name: "allow-list", keyType: "principal", valueType: "bool" });
  }
  const allowListAddresses: string[] = [];
  if (hasAllowList) {
    for (const addr of userSettings.mint?.["allow-list"]?.addresses || []) {
      allowListAddresses.push(
        t($mapInsert, { map: "allow-list", key: `'${addr}`, value: "true" })
      );
    }
  }

  /* BUILD SETTINGS */
  const baseSettings: ContractSettings = {
    traits: ["SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait"],
    constants,
    errors,
    dataVars,
    maps,
    templateHead: t($head, { name: userSettings.general.name }),
    templateBody: t(
      $body,
      {
        name: userSettings.general.name,
        ["update-settings-functions"]: updateSettingsFunctions.join("\n\n"),
        ["has-mint-limit"]: hasMintLimit,
        ["has-allow-list"]: hasAllowList,
        ["allow-list-addresses"]: allowListAddresses.join("\n  "),
      },
      { variables: contractVariables }
    ),
  };

  return baseSettings;
}

export function validateSettings(
  settings: any
): settings is NFTTemplateSettings {
  if (settings.template !== "nft") throw new Error("invalid template type");
  // @todo
  return true;
}
