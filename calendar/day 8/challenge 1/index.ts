import fs, { access } from "fs";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

interface Operation {
    type: "acc" | "jmp" | "nop";
    value: number;
    executed: boolean;
}

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = input.toString();

    const operations = _(text)
        .split("\r\n")
        .reduce((acc, line) => {
            const [type, valStr] = line.split(" ");
            const positive = valStr[0] == "+";
            const value = Number(valStr.slice(1));

            acc.push({
                type: type as Operation["type"],
                value: positive ? value : -value,
                executed: false,
            });

            return acc;
        }, [] as Operation[]);

    let accumulator = 0;

    for (let i = 0; i < operations.length; ++i) {
        const operation = operations[i];

        // Detected an infinite loop
        if (operation.executed) break;

        switch (operation.type) {
            case "acc":
                accumulator += operation.value;
                break;

            case "jmp":
                // Subtract 1, because the loop will increment it back to the right position
                i += operation.value - 1;
                break;

            case "nop":
            default:
        }

        operation.executed = true;
    }

    log.success(`Accumulator: ${chalk.bold(accumulator)}`);
} catch (e) {
    log.error(e);
}
