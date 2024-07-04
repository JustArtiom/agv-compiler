import { tokenize } from "./lexer";
import fs from "node:fs";
import { parser } from "./parser";
import { compile } from "./compiler";
import util from "node:util";
const filePath = "./code.agv";
const code = fs.readFileSync(filePath, "utf-8");
const tokens = tokenize(code, filePath);
const ast = parser(tokens, filePath);
const compiled = compile(ast);

console.log(compiled);
