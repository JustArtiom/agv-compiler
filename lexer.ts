export enum TokenType {
    Comment,
    Number,
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
};

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
