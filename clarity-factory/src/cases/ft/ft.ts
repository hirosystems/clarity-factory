import $head from "bundle-text:./ft-head.clar.template";
import $body from "bundle-text:./ft-body.clar.template";

import t from "../../util/t";
import type { AllowedErrors } from "../../util/errors";
import type { ContractSettings } from "../../types/contract-settings";
import type { FTTemplateSettings } from "../../types/contract-settings-ft.schema";

export default function buildFtSettings(userSettings: FTTemplateSettings) {
  const warnings: string[] = [];
  const { general, mint } = userSettings;

  /* INIT */
  const errors: AllowedErrors = [];
  if (!!mint?.["mint-limit"]) errors.push("ERR_UNAUTHORIZED");
  if (!mint?.["enable-burn"]) errors.push("ERR_FORBIDDEN");

  const dataVars: ContractSettings["dataVars"] = [];
  const constants: ContractSettings["constants"] = [];
  const maps: ContractSettings["maps"] = [];

  /* MAX SUPPLY */
  const hasMaxSupply = !!general["max-supply"];
  const maxSupply = hasMaxSupply ? `${general["max-supply"]}` : "";

  /* MINT LIMIT */
  const hasMintLimit = !!mint?.["mint-limit"];

  if (hasMintLimit) {
    maps.push({ name: "mint-count", keyType: "principal", valueType: "uint" });
    constants.push({ name: "MINT_LIMIT", value: `u${mint["mint-limit"]}` });
  }

  /* BUILD SETTINGS */
  const params = {
    tick: general.name,
    fullname: general.fullname || general.name,
    ["token-uri-base"]: general["token-uri-base"],
    ["max-supply"]: maxSupply,
    ["has-max-supply"]: hasMaxSupply,
    ["has-mint-limit"]: hasMintLimit,
    ["enable-burn"]: !!mint?.["enable-burn"],
  };

  const baseSettings: ContractSettings = {
    traits: [
      "SP3FBR2AGK5H9QBDH3EEN6DF8EK8JY7RX8QJ5SVTE.sip-010-trait-ft-standard.sip-010-trait",
    ],
    constants,
    errors,
    dataVars,
    maps,
    templateHead: t($head, params),
    templateBody: t($body, params),
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
