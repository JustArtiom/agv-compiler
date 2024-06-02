export enum TokenType {
    Comment,
    Var,
    Number,
    Boolean,
    String,
    Identifier,
    Equals,
    DoubleEquals,
    Greater,
    GreaterEqual,
    Less,
    LessEqual,
    NotEqual,
    Exclamation,
    Comma,
    Dot,
    OpenParen,
    CloseParen,
    If,
    Do,
    Fi,
    Else,
    While,
    Wend,
}

export interface Token {
    value: string;
    type: TokenType;
}

export const KEYWORDS: Record<string, TokenType> = {
    var: TokenType.Var,
    true: TokenType.Boolean,
    false: TokenType.Boolean,
    if: TokenType.If,
    do: TokenType.Do,
    fi: TokenType.Fi,
    else: TokenType.Else,
    while: TokenType.While,
    wend: TokenType.Wend,
};

export interface AgvErrorOptions {
    fPath?: string;
    code?: string;
    line?: number;
    column?: number;
}

export class AgvError {
    constructor(
        error: string,
        { fPath, code, line, column }: AgvErrorOptions = {}
    ) {
        this.error = `Error: ${error}`;

        this.fPath = fPath || __filename;
        if (line && column) {
            this.fPath += `:${line}:${column}`;
        }
        if (code && column) {
            this.code = this.getErrorContextVisualization(code, column);
        }
    }

    fPath!: string;
    code?: string;
    error!: string;
    stackErrors: string[] = ["at AGVCompiler [as runMain]"];

    private getErrorContextVisualization(
        lineText: string,
        errorColumn: number
    ): string {
        const start = Math.max(0, errorColumn - 60 - 1);
        const end = Math.min(lineText.length, errorColumn + 60);
        const context = lineText.slice(start, end);
        const marker = " ".repeat(errorColumn - start - 1) + "^";
        return `${context}\n${marker}`;
    }

    addStack(func: string, path?: string): this {
        this.stackErrors.unshift(`at ${func}${path ? ` (${path})` : ""}`);
        return this;
    }

    toString(): string {
        return (
            "" +
            `${this.fPath}\n` +
            `${this.code ? `${this.code}\n` : ""}` +
            `${this.error}\n` +
            `${this.stackErrors.map((x) => `   ${x}`).join("\n")}`
        );
    }

    [require("util").inspect.custom]() {
        return this.toString();
    }
}
