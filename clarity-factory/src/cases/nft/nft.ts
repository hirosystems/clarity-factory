import traverse from "json-schema-traverse";

import $head from "bundle-text:./nft-head.clar.template";
import $body from "bundle-text:./nft-body.clar.template";
import $updateSetting from "bundle-text:../../templates/components/update-owner-only-setting.clar.template";
import $mapInsert from "bundle-text:../../templates/components/map-insert.clar.template";

import schema from "./contract-settings-nft.schema.json";

import t, { ContractVariable } from "../../util/t";
import { getProp } from "../../util/literal";
import type { AllowedErrors } from "../../util/errors";
import type { ContractSettings } from "../../types/contract-settings";
import type { NFTTemplateSettings } from "../../types/contract-settings-nft.schema";
import { getClarityValue } from "../../util/clarity";
import { toUpperSnake } from "../../util/string";

type UpdatableField = { value: string | number; updatable?: boolean };

export default function buildNftSettings(userSettings: NFTTemplateSettings) {
  const warnings: string[] = [];
  const { general, currency, mint } = userSettings;
  /* SANITY CHECKS */
  if (!currency?.["enable-stx-mint"] && currency?.["stx-price"]) {
    delete currency?.["stx-price"];
  }
  if (!currency?.["enable-nyc-mint"] && currency?.["nyc-price"]) {
    delete currency?.["nyc-price"];
  }
  if (!currency?.["enable-mia-mint"] && currency?.["mia-price"]) {
    delete currency?.["mia-price"];
  }

  /* INIT */
  const errors: AllowedErrors = ["ERR_NOT_TOKEN_OWNER"];

  const enableContractOwner = !!general["enable-contract-owner"];
  if (enableContractOwner) {
    errors.push("ERR_NOT_CONTRACT_OWNER");
    if (!general["contract-owner"]?.value) {
      general["contract-owner"] = { value: "tx-sender" };
    }
  } else {
    if (
      general.hasOwnProperty("contract-owner") &&
      typeof general["contract-owner"] === "object"
    ) {
      general["contract-owner"] = undefined;
    }
  }

  const dataVars: ContractSettings["dataVars"] = [
    { name: "artist-address", type: "principal", value: "tx-sender" },
    { name: "last-token-id", type: "uint", value: "u0" },
  ];

  const constants: ContractSettings["constants"] = [];

  const maps: ContractSettings["maps"] = [];

  /* FREEZE METADATA */
  const enableFreezeMetadata =
    !!general["enable-freeze-metadata"] && enableContractOwner;
  if (!!general["enable-freeze-metadata"] && !enableContractOwner) {
    warnings.push(
      "Contract owner must be enabled in order to enable the freeze metadata feature"
    );
  }
  if (enableFreezeMetadata) {
    errors.push("ERR_METADATA_FROZEN");
    dataVars.push({ name: "metadata-frozen", type: "bool", value: "false" });
  }

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

      if (setting.updatable && !enableContractOwner) {
        warnings.push(
          `Contract owner must be enabled for ${name} to be updatable`
        );
      }

      contractVariables.push({
        name,
        isConst: !setting.updatable || !enableContractOwner,
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
  const hasMintLimit = !!mint?.["mint-limit"]?.value;
  if (hasMintLimit) {
    errors.push("ERR_REACHED_MINT_LIMIT");
    maps.push({ name: "mint-count", keyType: "principal", valueType: "uint" });
  }

  /* ALLOW LIST */
  const hasAllowList = !!mint?.["allow-list"];
  if (hasAllowList) {
    errors.push("ERR_UNAUTHORIZED");
    maps.push({ name: "allow-list", keyType: "principal", valueType: "bool" });
  }
  const hasAllowAll =
    !!mint?.["allow-list"]?.["allow-all-at-block-height"]?.value;
  const allowListAddresses: string[] = [];
  if (hasAllowList) {
    for (const addr of mint?.["allow-list"]?.addresses || []) {
      if (!addr) continue;
      allowListAddresses.push(
        t($mapInsert, {
          map: "allow-list",
          key: `'${addr.toUpperCase()}`,
          value: "true",
        })
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
    templateHead: t($head, { name: general.name }),
    templateBody: t(
      $body,
      {
        name: general.name,
        ["enable-freeze-metadata"]: enableFreezeMetadata,
        ["enable-stx-mint"]: !!currency?.["enable-stx-mint"],
        ["enable-nyc-mint"]: !!currency?.["enable-nyc-mint"],
        ["enable-mia-mint"]: !!currency?.["enable-mia-mint"],
        ["update-settings-functions"]: updateSettingsFunctions.join("\n\n"),
        ["has-mint-limit"]: hasMintLimit,
        ["has-allow-list"]: hasAllowList,
        ["has-allow-list-and-all"]: hasAllowList && hasAllowAll,
        ["has-allow-list-only"]: hasAllowList && !hasAllowAll,
        ["allow-list-addresses"]: allowListAddresses.join("\n  "),
      },
      { variables: contractVariables }
    ),
  };

  return {
    settings: baseSettings,
    warnings,
    userSettings: { general, currency, mint },
  };
}

export function validateSettings(
  settings: any
): settings is NFTTemplateSettings {
  if (settings.template !== "nft") throw new Error("invalid template type");
  // @todo
  return true;
}
