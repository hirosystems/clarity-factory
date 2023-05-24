/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type NFTTemplateSettings = NFTTemplateSettings1 & NFTTemplateSettings2;
export type NFTTemplateSettings1 = {
  [k: string]: unknown;
};
export type OwnerAddress = string;
export type OwnerCanBeUpdatedAfterDeploy = boolean;
export type AcceptSTX = boolean;
export type AcceptNYC = boolean;
export type AcceptMIA = boolean;
export type MintLimitCanBeUpdatedAfterDeploy = boolean;
/**
 * Add Stacks addresses to allow early access.
 */
export type AllowedAddresses = string[];
export type BlockHeight = number;

export interface NFTTemplateSettings2 {
  $schema?: string;
  /**
   * Name of the NFT
   */
  name: string;
  "contract-owner"?: ContractOwner;
  "enable-stx-mint"?: AcceptSTX;
  "enable-nyc-mint"?: AcceptNYC;
  "enable-mia-mint"?: AcceptMIA;
  "mint-limit"?: MintLimit;
  "allow-list"?: EarlyBirdAccess;
}
/**
 * Stacks address for the owner of this NFT contract. This address will be allowed to perform changes to the NFT contract's settings.
 */
export interface ContractOwner {
  value: OwnerAddress;
  updatable?: OwnerCanBeUpdatedAfterDeploy;
}
/**
 * Mint limit per STX address. Leave empty for unlimited.
 */
export interface MintLimit {
  value?: number;
  updatable?: MintLimitCanBeUpdatedAfterDeploy;
}
/**
 * Allow addresses to claim early access to your NFT.
 */
export interface EarlyBirdAccess {
  addresses?: AllowedAddresses;
  "allow-all-at-block-height"?: AllowAllAtBlockHeight;
}
/**
 * Allow everyone to mint from this block height. Leave empty to disable mint for all.
 */
export interface AllowAllAtBlockHeight {
  value: BlockHeight;
  updatable?: boolean;
}
