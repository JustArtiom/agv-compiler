export enum TokenType {
    // Comments
    Comment,

    // Types and variables
    Var,
    Identifier,
    Number,
    Boolean,
    String,

    // Binary operators
    Equals,
    DoubleEquals,
    Greater,
    GreaterEqual,
    Less,
    LessEqual,
    NotEqual,
    Exclamation,

    // Syntax
    Comma,
    Dot,
    OpenParen,
    CloseParen,

    // Logic
    If,
    Do,
    Fi,
    Else,
    While,
    Wend,
    func,
    cnuf,
}

export function getTokenTypeName(value: TokenType) {
    return Object.keys(TokenType).find(
        (key: string) => TokenType[key as keyof typeof TokenType] === value
    )!;
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
    func: TokenType.func,
    cnuf: TokenType.cnuf,
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
        this.addStack("at AGVCompiler", "as runMain");

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
    stackErrors: string[] = [];

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

    setError(name: string) {
        this.error = name;
        return this;
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

// AST
export interface ASTNode {
    type: string;
}

export interface VariableDeclaration extends ASTNode {
    type: "VariableDeclaration";
    name: string;
    value: any;
}

export interface IfStatement extends ASTNode {
    type: "IfStatement";
    condition: Condition;
    consequent: anyASTNode[];
    alternate: anyASTNode[];
}

export interface WhileStatement extends ASTNode {
    type: "WhileStatement";
    condition: Condition;
    body: anyASTNode[];
}

export interface Condition extends ASTNode {
    type: "Condition";
    left: ASTNode;
    operator: string;
    right: ASTNode;
}

export interface Identifier extends ASTNode {
    type: "Identifier";
    name: string;
}

export interface Literal extends ASTNode {
    type: "Literal";
    value: string;
}

export interface FuncCall extends ASTNode {
    type: "FunctionCall";
    name: string;
    parameters: Record<string, Literal>;
}

export type anyASTNode =
    | FuncCall
    | Literal
    | Identifier
    | Condition
    | WhileStatement
    | IfStatement
    | VariableDeclaration;

export function createNode<T extends anyASTNode>(
    type: T["type"],
    props: Omit<T, "type">
): T {
    return { type, ...props } as T;
}
