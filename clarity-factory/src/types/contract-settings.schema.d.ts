/* eslint-disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The contract owner feature enables administration feature such as changing some of contracts parameters after the contract is deployed
 */
export type EnableContractOwner = boolean;
export type OwnerAddress = string;
export type OwnerCanBeUpdatedAfterDeploy = boolean;
export type TokenURIBase1 = string;
export type TokenURIBaseCanBeUpdatedAfterDeploy = boolean;
/**
 * The contract owner can call thie freeze-metadata method to prevent future changes of the token-uri
 */
export type AddAFreezeMetadataFunction = boolean;
export type AcceptSTX = boolean;
export type AcceptNYC = boolean;
export type AcceptMIA = boolean;
export type ValueInSTX = number;
export type STXPriceCanBeUpdatedAfterDeploy = boolean;
export type ValueInNYC = number;
export type NYCPriceCanBeUpdatedAfterDeploy = boolean;
export type ValueInMIA = number;
export type MIAPriceCanBeUpdatedAfterDeploy = boolean;
export type MintLimitCanBeUpdatedAfterDeploy = boolean;
/**
 * Add Stacks addresses to allow early access.
 */
export type AllowedAddresses = string[];
export type BlockHeight = number;

export interface NFTTemplateSettings {
  $schema?: string;
  general: GeneralSettings;
  currency?: CurrenciesSettings;
  mint?: MintSettings;
}
export interface GeneralSettings {
  /**
   * Name of the NFT
   */
  name: string;
  "enable-contract-owner"?: EnableContractOwner;
  "contract-owner"?: ContractOwner;
  "token-uri-base": TokenURIBase;
  "enable-freeze-metadata"?: AddAFreezeMetadataFunction;
}
/**
 * Stacks address for the owner of this NFT contract. This address will be allowed to perform changes to the NFT contract's settings. Note: it can also be set to `tx-sender` so that the deployer of the contract will be the owner.
 */
export interface ContractOwner {
  value: OwnerAddress;
  updatable?: OwnerCanBeUpdatedAfterDeploy;
}
/**
 * Base URI for the NFT image. Typically a `https`, `ar`, `ipfs`, `sia` uri.
 */
export interface TokenURIBase {
  value: TokenURIBase1;
  updatable?: TokenURIBaseCanBeUpdatedAfterDeploy;
}
/**
 * Define if NFTs can be minted with STX and or Citycoins (NYC, MIA)
 */
export interface CurrenciesSettings {
  "enable-stx-mint"?: AcceptSTX;
  "enable-nyc-mint"?: AcceptNYC;
  "enable-mia-mint"?: AcceptMIA;
  "stx-price"?: STXPrice;
  "nyc-price"?: NYCPrice;
  "mia-price"?: MIAPrice;
}
/**
 * Price in STX.
 */
export interface STXPrice {
  value: ValueInSTX;
  updatable?: STXPriceCanBeUpdatedAfterDeploy;
}
/**
 * Price in NYC.
 */
export interface NYCPrice {
  value: ValueInNYC;
  updatable?: NYCPriceCanBeUpdatedAfterDeploy;
}
/**
 * Price in MIA.
 */
export interface MIAPrice {
  value: ValueInMIA;
  updatable?: MIAPriceCanBeUpdatedAfterDeploy;
}
/**
 * Mint settings such as limit and early birds
 */
export interface MintSettings {
  "mint-limit"?: MintLimit;
  "allow-list"?: EarlyBirdAccess;
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
