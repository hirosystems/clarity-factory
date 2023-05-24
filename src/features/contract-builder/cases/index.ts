import { RJSFSchema } from "@rjsf/utils";
import nftSchema from "../../../../clarity-factory/src/cases/nft/contract-settings-ui.schema.json";
import { initialData as nftinitialData } from "./nft/form-config";

export enum Cases {
  Nft,
}

const cases = {
  [Cases.Nft]: {
    schema: nftSchema as RJSFSchema,
    initialData: nftinitialData,
  },
};

export default cases;
