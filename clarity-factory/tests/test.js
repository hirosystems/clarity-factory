import fs from "fs";

import { buildSmartContract } from "../dist/main.js";

const config = JSON.parse(fs.readFileSync("./tests/test-project.json"));

const result = buildSmartContract("nft", config);

try {
  fs.statSync("./tests/temps");
} catch (e) {
  fs.mkdirSync("./tests/temp", { recursive: true });
}

fs.writeFileSync("./tests/temp/result.clar", result);
