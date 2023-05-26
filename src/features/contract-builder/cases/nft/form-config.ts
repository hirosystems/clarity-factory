import { NFTTemplateSettings } from "../../../../../clarity-factory/src/types/contract-settings-nft.schema";

export const initialData: NFTTemplateSettings = {
  general: {
    name: "my-awesome-nft",
    "token-uri-base": {
      value: "ipfs://.../",
      updatable: false,
    },
  },
  currency: {
    "enable-stx-mint": true,
    "stx-price": {
      value: 100,
      updatable: false,
    },
  },
};
