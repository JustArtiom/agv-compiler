import { tokenize } from "./lexer";
import fs from "node:fs";

for (let token of tokenize(fs.readFileSync("./code.agv", "utf-8"))) {
    console.log(token);
}
