import traverse from "json-schema-traverse";

import $head from "bundle-text:./nft-head.clar.template";
import $body from "bundle-text:./nft-body.clar.template";
import $updateSetting from "bundle-text:../../templates/components/update-owner-only-setting.clar.template";

import schema from "./contract-settings.schema.json";

import t from "../../util/t";
import { getProp } from "../../util/literal";
import type { AllowedErrors } from "../../util/errors";
import type { ContractSettings } from "../../types/contract-settings";
import type { NFTTemplateSettings } from "../../types/contract-settings.schema";
import { getClarityValue } from "../../util/clarity";

type UpdatableField = { value: string | number; updatable?: boolean };

export default function buildNftSettings(userSettings: NFTTemplateSettings) {
  const errors: AllowedErrors = ["ERR_NOT_TOKEN_OWNER"];
  if (userSettings["contract-owner"]?.value) {
    errors.push("ERR_NOT_CONTRACT_OWNER");
  }

  const dataVars: ContractSettings["dataVars"] = [
    { name: "last-token-id", type: "uint", value: "u0" },
  ];

  const constants: ContractSettings["constants"] = [];

  const maps: ContractSettings["maps"] = [];

  const updateSettingsFunctions: string[] = [];
  traverse(schema, {
    cb: (schema, pointer) => {
      if (schema.type !== "object") return;
      if (
        !schema.properties.hasOwnProperty("value") ||
        !schema.properties.hasOwnProperty("updatable")
      ) {
        return;
      }

      if (!schema.hasOwnProperty("title")) {
        console.warn("Schema error: Updatable props should have a title");
        return;
      }

      const path: string[] = pointer
        .replace(/\/properties/g, "")
        .split("/")
        .filter((p) => !!p);
      const name = path.at(-1)!;
      const type = schema.properties.value.clarityType;

      const setting = getProp<UpdatableField>(userSettings, path);
      if (!setting) return;

      const value = getClarityValue(type, setting.value);

      if (setting.updatable) {
        if (!userSettings["contract-owner"]?.value) {
          throw new Error(
            "The Contract Owner must be set in order to have updatalbe features"
          );
        }
        if (!schema.properties.value.hasOwnProperty("clarityType")) {
          throw new Error("Missing clarity type");
        }
        dataVars.push({
          name,
          type,
          value,
        });
        updateSettingsFunctions.push(
          t($updateSetting, { ["var-name"]: name, type })
        );
      } else {
        constants.push({ name, value });
      }
    },
  });

  if (userSettings["allow-list"]) {
    errors.push("ERR_UNAUTHORIZED");
    maps.push({ name: "allow-list", keyType: "principal", valueType: "bool" });
  }

  const baseSettings: ContractSettings = {
    traits: ["SP2PABAF9FTAJYNFZH93XENAJ8FVY99RRM50D2JG9.nft-trait.nft-trait"],
    constants,
    errors,
    dataVars,
    maps,
    templateHead: t($head, { name: userSettings.name }),
    templateBody: t($body, {
      name: userSettings.name,
      ["allow-list"]: !!userSettings["allow-list"],
      ["update-settings-functions"]: updateSettingsFunctions.join("\n\n"),
    }),
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
