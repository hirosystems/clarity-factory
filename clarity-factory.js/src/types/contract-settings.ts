import { AllowedErrors } from "../util/errors";

type Constant = { name: string; value: string };
type DataVar = { name: string; type: "uint" | "int" | string; value: string };
type Map = { name: string; keyType: string; valueType: string };

export type ContractSettings = {
  traits: string[];
  constants: Constant[];
  dataVars: DataVar[];
  maps: Map[];
  errors: AllowedErrors;
  templateHead: string;
  templateBody: string;
};
