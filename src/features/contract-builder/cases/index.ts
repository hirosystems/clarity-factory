import { RJSFSchema } from "@rjsf/utils";
import nftSchema from "../../../../clarity-factory/src/cases/nft/contract-settings-ui.schema.json";
import {
  uiSchema as nftUiSchema,
  initialData as nftinitialData,
} from "./nft/form-config";

export enum Cases {
  Nft,
}

const cases = {
  [Cases.Nft]: {
    schema: nftSchema as RJSFSchema,
    initialData: nftinitialData,
    uiSchema: nftUiSchema,
  },
};

export default cases;
