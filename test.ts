import { tokenize } from "./lexer";
import { compileToPLC } from "./compiler";
import fs from "node:fs";

const code = fs.readFileSync("./code.agv", "utf-8");

// for (let token of tokenize(fs.readFileSync("./code.agv", "utf-8"))) {
//     console.log(token);
// }

console.log(compileToPLC(code));
