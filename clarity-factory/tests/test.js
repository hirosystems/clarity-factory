// @ts-check

import fs from "fs";
import { buildSmartContract } from "../dist/main.js";

try {
  fs.statSync("./tests/temps");
} catch (e) {
  fs.mkdirSync("./tests/temp", { recursive: true });
}

/** @type import("../src/types/contract-settings-nft.schema.d.ts").NFTTemplateSettings */
const configNFT = JSON.parse(
  fs.readFileSync("./tests/test-nft-project.json").toString("utf-8")
);

const resultNFT = buildSmartContract("nft", configNFT);
fs.writeFileSync("./tests/temp/result-nft.clar", resultNFT.contract);

/** @type import("../src/types/contract-settings-ft.schema.d.ts").FTTemplateSettings */
const configFT = JSON.parse(
  fs.readFileSync("./tests/test-ft-project.json").toString("utf-8")
);

const resultFT = buildSmartContract("ft", configFT);
fs.writeFileSync("./tests/temp/result-ft.clar", resultFT.contract);
