/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Maximum supply of the token.
 */
export type TokenURIBase = number;
/**
 * Base URI for the FT metadata (see SIP-016). Typically a `https`, `ar`, `ipfs`, `sia` uri.
 */
export type TokenURIBase1 = string;
/**
 * Mint limit per STX address. Leave empty for unlimited.
 */
export type MintLimit = number;
/**
 * Token holders will be able to call the ft-burn method.
 */
export type EnableBurn = boolean;

export interface FTTemplateSettings {
  $schema?: string;
  general: GeneralSettings;
  mint?: TokenManagement;
}
export interface GeneralSettings {
  /**
   * The name or tick of the FT
   */
  name: string;
  /**
   * Human readable name of the token
   */
  fullname?: string;
  "max-supply"?: TokenURIBase;
  "token-uri-base": TokenURIBase1;
}
/**
 * Mint and burn settings
 */
export interface TokenManagement {
  "mint-limit"?: MintLimit;
  "enable-burn"?: EnableBurn;
}