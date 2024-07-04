import {
    ASTNode,
    AgvError,
    Condition,
    Token,
    TokenType,
    anyASTNode,
    createNode,
    getTokenTypeName,
} from "./utils";
import path from "node:path";

const throwParserError = (fname: string, error: string) =>
    console.error(
        new AgvError(error)
            .addStack("AgvCompiler.Parser", path.resolve(__filename))
            .addStack("AgvCompiler.Parser.walk", path.resolve(__filename))
            .addStack("AgvCompiler.UserInput", `${path.resolve(fname)}`)
    );

const expectToken = (
    fname: string,
    curr: TokenType | undefined,
    types: TokenType[]
) => {
    if (types.find((x) => x === curr)) return true;

    throwParserError(
        fname,
        `Expected token ${types
            .map((x) => getTokenTypeName(x))
            .join(", ")} but received ${curr ? getTokenTypeName(curr) : curr} `
    );
    process.exit(1);
};

export function parser(tokens: Token[], fname: string): anyASTNode[] {
    let current = 0;

    const getTkn = () => tokens[current];

    function walk(): anyASTNode | undefined {
        let token = getTkn();

        if (
            [TokenType.Number, TokenType.Boolean, TokenType.String].includes(
                token.type
            )
        ) {
            current++;

            if (
                [
                    TokenType.DoubleEquals,
                    TokenType.Greater,
                    TokenType.GreaterEqual,
                    TokenType.Less,
                    TokenType.LessEqual,
                    TokenType.NotEqual,
                ].find((x) => x === getTkn()?.type)
            ) {
                let operator = getTkn();
                current++;

                expectToken(fname, getTkn()?.type, [
                    TokenType.Number,
                    TokenType.Boolean,
                    TokenType.String,
                    TokenType.Identifier,
                ]);

                const right = walk();

                return createNode("Condition", {
                    left: token,
                    operator,
                    right: right,
                });
            }

            return createNode("Literal", { value: token.value });
        }

        if (token.type == TokenType.Identifier) {
            current++;

            if (
                [
                    TokenType.DoubleEquals,
                    TokenType.Greater,
                    TokenType.GreaterEqual,
                    TokenType.Less,
                    TokenType.LessEqual,
                    TokenType.NotEqual,
                ].find((x) => x === getTkn()?.type)
            ) {
                let operator = getTkn();
                current++;

                expectToken(fname, getTkn()?.type, [
                    TokenType.Number,
                    TokenType.Boolean,
                    TokenType.String,
                    TokenType.Identifier,
                ]);

                const right = walk();

                return createNode("Condition", {
                    left: token,
                    operator,
                    right: right,
                });
            }

            if (getTkn()?.type == TokenType.OpenParen) {
                current++;
                const params: Record<string, any> = {};

                const fetchInParam = () => {
                    expectToken(fname, getTkn()?.type, [
                        TokenType.CloseParen,
                        TokenType.Identifier,
                    ]);

                    if (getTkn()?.type == TokenType.CloseParen) {
                        current++;
                        return "end";
                    }

                    const paramName = getTkn().value;
                    current++;

                    expectToken(fname, getTkn()?.type, [TokenType.Equals]);
                    current++;

                    expectToken(fname, getTkn()?.type, [
                        TokenType.Number,
                        TokenType.Boolean,
                        TokenType.String,
                        TokenType.Identifier,
                    ]);

                    params[paramName] = walk();
                    expectToken(fname, getTkn()?.type, [
                        TokenType.Comma,
                        TokenType.CloseParen,
                    ]);

                    if (getTkn()?.type == TokenType.Comma) current++;
                };

                while (fetchInParam() !== "end");

                return createNode("FunctionCall", {
                    name: token.value,
                    parameters: params,
                });
            }

            return createNode("Identifier", { name: token.value });
        }

        if (token.type == TokenType.Var) {
            current++; // Skip Var

            let varName = "";

            expectToken(fname, getTkn()?.type, [TokenType.Identifier]);

            varName = getTkn().value;
            current++; // Skip the identifier

            expectToken(fname, getTkn()?.type, [TokenType.Equals]);
            current++; // Skip the equal sign

            expectToken(fname, getTkn()?.type, [
                TokenType.Boolean,
                TokenType.Number,
                TokenType.String,
                TokenType.Identifier,
            ]);

            return createNode("VariableDeclaration", {
                name: varName,
                value: walk(),
            });
        }

        if (token.type == TokenType.If) {
            current++;

            const ifStatement: Record<string, any> = {
                condition: walk(),
                consequent: [],
                alternate: [],
            };

            expectToken(fname, getTkn()?.type, [TokenType.Do]);
            current++;

            let isElse = false;

            while (getTkn()?.type !== TokenType.Fi) {
                if (!getTkn()) {
                    throwParserError(
                        fname,
                        "If statement was never closed. Did you forget to add Fi at the end?"
                    );
                    process.exit(1);
                }

                if (getTkn().type == TokenType.Else) {
                    isElse = true;
                    current++;
                    continue;
                }

                ifStatement[isElse ? "alternate" : "consequent"].push(walk());
            }
            current++;

            return createNode("IfStatement", ifStatement);
        }

        throwParserError(
            fname,
            `Unknown token type ${getTokenTypeName(token.type)} (Token Id: ${
                token.type
            })`
        );
        process.exit(1);
    }

    let ast: anyASTNode[] = [];
    while (current < tokens.length) {
        const job = walk();
        if (job) ast.push(job);
    }

    return ast;
}
