export const uiSchema = {
  $schema: {
    "ui:widget": "hidden",
  },
  "ui:order": [
    "$schema",
    "name",
    "contract-owner",
    "tokens",
    "enable-stx-mint",
    "stx-price",
    "enable-nyc-mint",
    "nyc-price",
    "enable-mia-mint",
    "mia-price",
    "mint-limit",
    "allow-list",
  ],
};

export const initialData = {
  name: "my-awesome-nft",
  ustxPrice: { value: 1000, updatable: false },
  nycPrice: null,
  miaPrice: null,
  allowList: {
    addresses: [],
    allowAllAtBlockHeight: {
      value: 100,
      updatable: false,
    },
  },
};
