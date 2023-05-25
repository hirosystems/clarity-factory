import $main from "bundle-text:./templates/main.clar.template";

import $traits from "bundle-text:./templates/components/impl-trait.clar.template";
import $dataVar from "bundle-text:./templates/components/define-data-var.clar.template";
import $constant from "bundle-text:./templates/components/define-constant.clar.template";
import $map from "bundle-text:./templates/components/define-map.clar.template";

import buildNftSettings from "./cases/nft/nft";
import t from "./util/t";
import { buildErrorDeclaration } from "./util/errors";
import { NFTTemplateSettings } from "./types/contract-settings-nft.schema";
import { FTTemplateSettings } from "./types/contract-settings-ft.schema";
import buildFtSettings from "./cases/ft/ft";

const templates = ["nft", "ft"] as const;

type Templates = (typeof templates)[number];
type TemplateSettings = NFTTemplateSettings | FTTemplateSettings;

export type SmartContract = {
  contract: string;
  diagnostics: { warnings: string[] };
  userSettings: TemplateSettings;
};

function getContractSettings(template: Templates, settings: TemplateSettings) {
  if (template === "nft") {
    return buildNftSettings(settings as NFTTemplateSettings);
  }
  if (template === "ft") {
    return buildFtSettings(settings as FTTemplateSettings);
  }
  throw new Error("invalid template");
}

export function buildSmartContract(
  template: "ft",
  userSettings: FTTemplateSettings
): SmartContract;
export function buildSmartContract(
  template: "nft",
  userSettings: NFTTemplateSettings
): SmartContract;
export function buildSmartContract(
  template: Templates,
  userSettings: TemplateSettings
): SmartContract {
  const clonedSettings = structuredClone(userSettings);
  const {
    settings,
    warnings,
    userSettings: updatedUserSettings,
  } = getContractSettings(template, clonedSettings);

  const errConstants = buildErrorDeclaration(settings.errors);

  const constants = settings.constants
    .map((constant) => t($constant, constant))
    .join("\n");

  const dataVars = settings.dataVars
    .map((dataVar) => t($dataVar, dataVar))
    .join("\n");

  const maps = settings.maps.map((map) => t($map, map)).join("\n");

  const traits = settings.traits
    .map((trait) => t($traits, { trait }))
    .join("\n");

  const contract = t(
    $main,
    {
      traits,
      constants,
      dataVars,
      maps,
      errConstants,
      templateHead: settings.templateHead,
      templateBody: settings.templateBody,
    },
    { removeUnknown: false }
  );

  return {
    contract,
    diagnostics: { warnings },
    userSettings: updatedUserSettings,
  };
}
