import { funcToId } from "./agv";
export const compile = (astList: any) => {
  const parsedLine = [
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
  while (astList.length)
    {
        const element=astList.shift();
        console.log(element)
        if (element.type=="functionCall")
            {
                const sysCommand=funcToId[element.name]
                if (sysCommand)
                    {
                        for (let [key, token] of Object.entries(element.params)) {
                            if (!(key in sysCommand.params)) {
                                throw new Error(
                                    `Param given "${key}" was not found in the "${element.name}" function params`
                                );
                            }
                    }
                }
            }
    }
    




}