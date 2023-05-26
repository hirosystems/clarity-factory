import { FTTemplateSettings } from "../../../../../clarity-factory/src/types/contract-settings-ft.schema";

export const initialData: FTTemplateSettings = {
  general: {
    name: "HAI",
    fullname: "HAI Token",
    "token-uri-base": "ipfs://.../",
    "max-supply": 21000000,
  },
  mint: {
    "mint-limit": 1000,
    "enable-burn": true,
  },
};
