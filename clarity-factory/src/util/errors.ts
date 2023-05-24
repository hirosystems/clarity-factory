import t from "./t";

import $defineConstant from "bundle-text:../templates/components/define-constant.clar.template";

const availableErrors = {
  ERR_UNAUTHORIZED: "1000",
  ERR_NOT_CONTRACT_OWNER: "1001",
  ERR_NOT_TOKEN_OWNER: "1002",
} as const;

export type AllowedErrors = (keyof typeof availableErrors)[];

export function buildErrorDeclaration(errors: AllowedErrors) {
  return errors
    .map((error) =>
      t($defineConstant, {
        name: error,
        value: `(err u${availableErrors[error]})`,
      })
    )
    .join("\n");
}
