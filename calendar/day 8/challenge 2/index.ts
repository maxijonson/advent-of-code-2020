import fs, { access } from "fs";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

interface Operation {
    type: "acc" | "jmp" | "nop" | "eof";
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

    operations.push({ type: "eof", value: 0, executed: false });

    let accumulator = 0;
    let reachedEof = false;
    let changeIndex = -2; // -2 because the first run will set it to -1 (maybe no operation needs to be changed!)

    // Each time we loop back, it means we've hit an infinite loop. We increment the changeIndex to attempt swapping operations.
    while (!reachedEof && changeIndex <= operations.length - 1) {
        // Reset accumulator
        accumulator = 0;

        // Increment change index
        ++changeIndex;

        // Reset operations' executed state
        _.forEach(operations, (o) => {
            o.executed = false;
        });

        for (let i = 0; i < operations.length; ++i) {
            const operation = operations[i];
            let type = operation.type;

            // Detected an infinite loop
            if (operation.executed) break;

            // Swap the operation for another
            if (i == changeIndex && type != "acc") {
                type = operation.type == "nop" ? "jmp" : "nop";
            }

            switch (type) {
                case "acc":
                    accumulator += operation.value;
                    break;

                case "jmp":
                    // Subtract 1, because the loop will increment it back to the right position
                    i += operation.value - 1;
                    break;

                case "eof":
                    reachedEof = true;
                    break;

                case "nop":
                default:
            }

            operation.executed = true;
        }
    }

    if (reachedEof) {
        log.success(`Accumulator: ${chalk.bold(accumulator)}`);
    } else {
        log.error(
            "Changed all operations, but always ended up in an infinite loop..."
        );
    }
} catch (e) {
    log.error(e);
}
