export enum TokenType {
    Comment,
    Number,
    Boolean,
    Identifier,
    Equals,
    Comma,
    OpenParen,
    CloseParen,
    SysFunction,
}

export interface Token {
    value: string;
    type: TokenType;
}

export const KEYWORDS: Record<string, TokenType> = {
    wait: TokenType.SysFunction,
    true: TokenType.Boolean,
    false: TokenType.Boolean,
};

export function getTokenTypeString(type: TokenType): string {
    for (const key in TokenType) {
        const enumValue = TokenType[key as keyof typeof TokenType];
        if (enumValue === type) {
            return key;
        }
    }
    return "Unknown";
}

export function token(value: string, type: TokenType): Token {
    return { value, type };
}

export function isComment(str: string): boolean {
    return str == "/";
}

export function isAlpha(str: string): boolean {
    return /^[A-Za-z]+$/.test(str);
}

export function isInt(str: string): boolean {
    return /^-?\d+$/.test(str);
}

export function isSkippable(str: string): boolean {
    return str == " " || str == "\n" || str == "\t" || str == "\r";
}

export function tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");

    while (src.length > 0) {
        if (src[0] == "(")
            tokens.push(token(src.shift()!, TokenType.OpenParen));
        else if (src[0] == ")")
            tokens.push(token(src.shift()!, TokenType.CloseParen));
        else if (src[0] == "=")
            tokens.push(token(src.shift()!, TokenType.Equals));
        else if (src[0] == ",")
            tokens.push(token(src.shift()!, TokenType.Comma));
        else {
            if (isComment(src[0])) {
                let ident = "";
                while (
                    src.length > 0 &&
                    (isComment(src[0]) || ident.startsWith("//")) &&
                    !ident.endsWith("\n")
                ) {
                    ident += src.shift();
                }

                tokens.push(token(ident.trim(), TokenType.Comment));
            } else if (isInt(src[0])) {
                let num = "";
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                }

                tokens.push(token(num, TokenType.Number));
            } else if (isAlpha(src[0])) {
                let ident = "";
                while (src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift();
                }

                const reserved = KEYWORDS[ident];
                if (reserved) tokens.push(token(ident, reserved));
                else tokens.push(token(ident, TokenType.Identifier));
            } else if (isSkippable(src[0])) {
                src.shift();
            } else {
                throw new Error(
                    `Unrecognized character found by the lexer: ${src[0]}`
                );
            }
        }
    }

    return tokens;
}

export const expect = (token: Token, tokenType: TokenType) =>
    token?.type == tokenType;

export interface ParsedFunction {
    funcName: string;
    params: Record<string, { value: string; type: TokenType }>;
}

export const parseTokens = (tokens: Token[]): ParsedFunction => {
    const parsedFunction: ParsedFunction = { funcName: "", params: {} };

    let loadingParam = "";
    let paramCollector = false;
    let expectedTokens: TokenType[] = [];

    for (const token of tokens) {
        if (paramCollector) {
            if (!tokens.find((x) => x.type === TokenType.CloseParen))
                throw new Error(`Did you forgot to close the parenthesis?`);
            if (expectedTokens.length && !expectedTokens.includes(token.type))
                throw new Error(
                    `Unexpected token while expecting parameter. Expected ${expectedTokens
                        .map((x) => `"${getTokenTypeString(x)}"`)
                        .join(", ")} but received "${getTokenTypeString(
                        token.type
                    )}"`
                );
            if (token.type == TokenType.OpenParen) {
                expectedTokens = [TokenType.Identifier, TokenType.CloseParen];
            }
            if (token.type == TokenType.Identifier) {
                expectedTokens = [TokenType.Equals];
                loadingParam = token.value;
            }
            if (token.type == TokenType.Equals) {
                expectedTokens = [TokenType.Number, TokenType.Boolean];
            }
            if ([TokenType.Number, TokenType.Boolean].includes(token.type)) {
                expectedTokens = [TokenType.Comma, TokenType.CloseParen];
                parsedFunction.params[loadingParam] = token;
                loadingParam = "";
            }
            if (token.type == TokenType.Comma) {
                expectedTokens = [TokenType.Identifier];
            }
            if (token.type == TokenType.CloseParen) {
                expectedTokens = [];
            }
        } else {
            if (token.type === TokenType.SysFunction) {
                parsedFunction.funcName = token.value;
                expectedTokens = [TokenType.OpenParen];
                paramCollector = true;
            }
        }
    }

    return parsedFunction;
};

export const parseDataTypes = <T = any>(token: Token): T => {
    if (token.type == TokenType.Boolean) {
        if (token.value == "true") {
            return true as T;
        } else if (token.value == "false") {
            return false as T;
        } else {
            throw new Error(
                `Invalid data when parsing. Data type was declared "${token.type}" but the value was "${token.value}"`
            );
        }
    }

    if (token.type == TokenType.Number) {
        const toReturn = Number(token.value);

        if (!toReturn)
            throw new Error(
                `Invalid data when parsing. Data type was declared "${token.type}" but the value was "${token.value}"`
            );
        return toReturn as T;
    }

    return token.value as T;
};

export default {
    tokenize,
    parseDataTypes,
    TokenType,
    parseTokens,
};
