import { NFTTemplateSettings } from "../../../../../clarity-factory/src/types/contract-settings-ui.schema";

export const initialData: NFTTemplateSettings = {
  general: {
    name: "my-awesome-nft",
    "token-uri-base": {
      value: "http://your-hosted-token-uri-base.com",
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