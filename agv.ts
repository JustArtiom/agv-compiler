export interface SysFunction {
    id: string;
    params: {
        [key: string]: {
            P: number;
            type: "number" | "string" | "boolean";
            regex?: RegExp;
        };
    };
}

export const funcToId: Record<string, SysFunction> = {
    wait: {
        id: "00001",
        params: {
            millesimi: {
                P: 1,
                type: "number",
                regex: /^(?:[1-9]|1\d|2[0-9]|30)$/,
            },
            centesimi: {
                P: 2,
                type: "number",
                regex: /^(?:[1-9]|[1-9][0-9]|[1-2][0-9]{2}|300)$/,
            },
            decimi: {
                P: 3,
                type: "number",
                regex: /^(?:[1-9]|[1-9]\d{1,2}|[1-2]\d{3}|3000)$/,
            },
            seconds: {
                P: 4,
                type: "number",
                regex: /^(?:[1-9]|[1-9]\d{1,3}|[1-2]\d{4}|30000)$/,
            },
            jumpto: {
                P: 5,
                type: "number",
            },
            async: {
                P: 6,
                type: "boolean",
            },
            actionStartButton: {
                P: 7,
                type: "boolean",
            },
        },
    },
};

export default { funcToId };
