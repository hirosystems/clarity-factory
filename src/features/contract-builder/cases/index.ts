import nftSchema from "../../../../clarity-factory/src/cases/nft/contract-settings-nft.schema.json";
import ftSchema from "../../../../clarity-factory/src/cases/ft/contract-settings-ft.schema.json";
import { initialData as nftInitialData } from "./nft/form-config";
import { initialData as ftInitialData } from "./ft/form-config";

export enum Cases {
  Nft,
  Ft,
}

const cases = {
  [Cases.Nft]: {
    schema: nftSchema,
    initialData: nftInitialData,
  },
  [Cases.Ft]: {
    schema: ftSchema,
    initialData: ftInitialData,
  },
};

export default cases;
