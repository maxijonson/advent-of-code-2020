import fs from "fs";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = input.toString();

    const valid = _(text)
        .split("\n")
        .reduce((acc, line) => {
            const firstPosStr = line.slice(0, line.indexOf("-"));
            const firstPos = Number(firstPosStr);

            if (isNaN(firstPos)) {
                throw new Error(`firstPos: ${firstPos} is not a number`);
            }

            line = line.slice(firstPosStr.length + 1);

            const secondPosStr = line.slice(0, line.indexOf(" "));
            const secondPos = Number(secondPosStr);

            line = line.slice(secondPosStr.length + 1);

            if (isNaN(secondPos)) {
                throw new Error(`secondPos: ${secondPos} is not a number`);
            }

            const char = line[0];
            const password = line.slice(3);

            const matchFirst = password[firstPos - 1] == char;
            const matchSecond = password[secondPos - 1] == char;

            if (matchFirst != matchSecond) {
                ++acc;
            }

            return acc;
        }, 0);

    log.success(`Valid passwords: ${chalk.bold(valid)}`);
} catch (e) {
    log.error(e);
}
