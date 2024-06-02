import { tokenize } from "./lexer";
import { compileToPLC } from "./compiler";
import fs from "node:fs";

const filePath = "./code.agv";
const code = fs.readFileSync(filePath, "utf-8");

console.log(tokenize(code, filePath));
