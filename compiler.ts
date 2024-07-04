import agv, { funcToId } from "./agv";
import { anyASTNode } from "./utils";
export const compile = (astList: anyASTNode[]) => {
    let compiled = [];

    while (astList.length) {
        const element = astList.shift()!;

        if (element.type == "IfStatement") {
            console.log(element);

            compile(element.consequent);

            /** @todo */
            /** @todo */
            /** @todo */
            /** @todo */
            /** @todo */

            continue;
        }

        compiled.push(astToPlc(element));
    }

    return compiled;
};

export const astToPlc = (astNode: anyASTNode) => {
    const plc = [
        "00000", // 0 Command name
        "00000", // 1 P1
        "00000", // 2 P2
        "00000", // 3 P3
        "00000", // 4 P4
        "00000", // 5 P5
        "00000", // 6 P6
        "00000", // 7 P7
        "", // 8 Comments
    ];

    if (astNode.type == "FunctionCall") {
        const sysCommand = funcToId[astNode.name];

        if (sysCommand) {
            plc[0] = sysCommand.id;

            for (let [key, token] of Object.entries(astNode.parameters)) {
                if (!(key in sysCommand.params)) {
                    throw new Error(
                        `Param given "${key}" was not found in the "${astNode.name}" function params`
                    );
                }

                const param = sysCommand.params[key];
                switch (param.type) {
                    case "number":
                        if (param.regex && !param.regex.test(token.value)) {
                            throw new Error(
                                `Param "${key}" does not match the required format in the "${astNode.name}" function`
                            );
                        }
                        break;
                }

                plc[sysCommand.params[key].P] = token.value.padStart(5, "0");
            }
        } else {
            throw new Error(
                'Function "' +
                    astNode.name +
                    '" has been called but it was "undefined"'
            );
        }
    }

    return plc;
};
