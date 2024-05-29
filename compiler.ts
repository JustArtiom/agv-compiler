import lexer, { Token, TokenType } from "./lexer";
import agv from "./agv";

export const parseLineToPLC = (codeLine: string) => {
    const parsedLine = [
        "00000", // 0 Command name
        "00000", // 1 P1
        "00000", // 2 P2
        "00000", // 3 P3
        "00000", // 4 P4
        "00000", // 5 P5
        "00000", // 6 P6
        "00000", // 7 P7
        "", //   // 8 Comments
    ];
    if (!codeLine.trim()) return parsedLine;
    const tokens = lexer.tokenize(codeLine);

    for (let token of tokens) {
        if (token.type == TokenType.Comment) {
            parsedLine[8] = token.value;
        }
        if (token.type == TokenType.SysFunction) {
            const funcId = agv.funcToId[token.value];
            if (!funcId)
                throw new Error(`The SysFunc "${token.value}" is undefined`);
            parsedLine[0] = funcId.id;
        }
    }

    if (parsedLine[0] !== "00000") {
        const { funcName, params } = lexer.parseTokens(tokens);
        const funcOpt = agv.funcToId[funcName];
        for (let [key, token] of Object.entries(params)) {
            if (!(key in funcOpt.params)) {
                throw new Error(
                    `Param given "${key}" was not found in the "${funcName}" function params`
                );
            }

            const expectedParam = funcOpt.params[key];
            const parsedTokenValue = lexer.parseDataTypes(token);
            if (expectedParam.type !== typeof parsedTokenValue) {
                throw new Error(
                    `Param "${key}" in function "${funcName}" expects a ${
                        expectedParam.type
                    } but got ${typeof parsedTokenValue}`
                );
            }

            if (expectedParam.regex && !expectedParam.regex.test(token.value)) {
                throw new Error(
                    `Param "${key}" in function "${funcName}" does not match the expected pattern: ${expectedParam.regex}`
                );
            }

            if (token.type == TokenType.Boolean)
                parsedLine[expectedParam.P] = (
                    token.value == "true" ? "1" : "0"
                ).padStart(5, "0");
            else parsedLine[expectedParam.P] = token.value.padStart(5, "0");
        }
    }

    return parsedLine;
};

export const compileToPLC = (sourceCode: string) => {
    const srcLines = sourceCode.split("\n");
    const compiled = [];

    while (srcLines.length) {
        const parsedLine = parseLineToPLC(srcLines.shift()!);
        compiled.push(parsedLine.join(""));
    }

    return compiled.join("\n");
};
