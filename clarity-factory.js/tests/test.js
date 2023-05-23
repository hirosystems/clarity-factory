import fs from "fs";

import { buildSmartContract } from "../dist/main.js";

const config = JSON.parse(fs.readFileSync("./tests/test-project.json"));

const result = buildSmartContract("nft", config);

try {
  fs.statSync("./tests/temps");
} catch (e) {
  fs.mkdirSync("./tests/temp", { recursive: true });
}

console.log("*".repeat(20));
console.log(result);
fs.writeFileSync("./tests/temp/result.clar", result);
