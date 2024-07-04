import { TokenType, Token, KEYWORDS, AgvError } from "./utils";
import path from "node:path";

export function tokenize(sourceCode: string, fPath: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");

    let line = 1;
    let column = 1;

    while (src.length > 0) {
        const tkn = src.shift()!;

        column++;
        if (tkn === "\n") {
            line++;
            column = 1;
        }

        if (tkn == "/" && src[0] == "/") {
            // @ts-expect-error No overlap occurs since i am shifting form the string
            while (src.length && src[0] !== "\n") {
                src.shift();
            }
        } else if (tkn == "(") {
            tokens.push(token(tkn, TokenType.OpenParen));
        } else if (tkn == ")") {
            tokens.push(token(tkn, TokenType.CloseParen));
        } else if (tkn == ",") {
            tokens.push(token(tkn, TokenType.Comma));
        } else if (tkn == ".") {
            tokens.push(token(tkn, TokenType.Dot));
        } else if (src.length && tkn == '"') {
            let string = "";

            const beforeProcess = { line, column };

            while (src[0] !== '"') {
                if (!src.length) {
                    console.error(
                        new AgvError(
                            "Unfinished string detected. Did you forget to add a quotation?",
                            {
                                fPath: __filename,
                                line: beforeProcess.line,
                                column: beforeProcess.column,
                                code: sourceCode.split("\n")[
                                    beforeProcess.line - 1
                                ],
                            }
                        )
                            .addStack("AGVCompiler.lexer.tokenize", __filename)
                            .addStack(
                                "AGVCompiler.userInput",
                                `${path.resolve(fPath)}:${line}:${column}`
                            )
                    );
                    process.exit(1);
                }
                string += src.shift();
                column++;
            }

            src.shift();
            column++;

            tokens.push(
                token(
                    string == "left"
                        ? "0"
                        : string == "front"
                        ? "90"
                        : string == "right"
                        ? "180"
                        : string,
                    TokenType.String
                )
            );
        } else if (tkn == "=") {
            if (src[0] == "=") {
                src.shift();
                column++;
                tokens.push(token("==", TokenType.DoubleEquals));
            } else tokens.push(token(tkn, TokenType.Equals));
        } else if (tkn == ">") {
            if (src[0] == "=") {
                src.shift();
                column++;
                tokens.push(token(">=", TokenType.GreaterEqual));
            } else tokens.push(token(tkn, TokenType.Greater));
        } else if (tkn == "<") {
            if (src[0] == "=") {
                src.shift();
                column++;
                tokens.push(token("<=", TokenType.LessEqual));
            } else tokens.push(token(tkn, TokenType.Less));
        } else if (isSkippable(tkn)) {
        } else if (isInt(tkn)) {
            let num = tkn;
            while (src.length && isInt(src[0])) {
                num += src.shift();
                column++;
            }

            tokens.push(token(num, TokenType.Number));
        } else if (isAlpha(tkn)) {
            let ident = tkn;
            while (src.length && isAlpha(src[0])) {
                ident += src.shift();
                column++;
            }

            const reserved = KEYWORDS[ident];
            if (reserved) {
                if (reserved === TokenType.Boolean) {
                    tokens.push(token(ident == "true" ? "1" : "0", reserved));
                } else {
                    tokens.push(token(ident, reserved));
                }
            } else tokens.push(token(ident, TokenType.Identifier));
        } else {
            console.error(
                new AgvError("Unrecognized token found", {
                    fPath: __filename,
                    line,
                    column,
                    code: sourceCode.split("\n")[line - 1],
                })
                    .addStack("AGVCompiler.lexer.tokenize", __filename)
                    .addStack(
                        "AGVCompiler.userInput",
                        `${path.resolve(fPath)}:${line}:${column}`
                    )
            );
            process.exit(1);
        }
    }

    return tokens;
}

function token(value: string, type: TokenType): Token {
    return { value, type };
}

function isAlpha(str: string): boolean {
    return /^[A-Za-z]+$/.test(str);
}

function isInt(str: string): boolean {
    return /^-?\d+$/.test(str);
}

function isSkippable(str: string): boolean {
    return str == " " || str == "\n" || str == "\t" || str == "\r";
}

export default {
    tokenize,
};
