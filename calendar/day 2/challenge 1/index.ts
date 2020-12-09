import fs from "fs";
import os from "os";
import eol from "eol";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = eol.auto(input.toString());

    const valid = _(text)
        .split(os.EOL)
        .reduce((acc, line) => {
            const minStr = line.slice(0, line.indexOf("-"));
            const min = Number(minStr);

            if (isNaN(min)) {
                throw new Error(`min: ${min} is not a number`);
            }

            line = line.slice(minStr.length + 1);

            const maxStr = line.slice(0, line.indexOf(" "));
            const max = Number(maxStr);

            line = line.slice(maxStr.length + 1);

            if (isNaN(max)) {
                throw new Error(`max: ${max} is not a number`);
            }

            const char = line[0];
            const password = line.slice(3);

            const count = _.countBy(password, (c) => c == char)["true"];

            if (count >= min && count <= max) {
                ++acc;
            }

            return acc;
        }, 0);

    log.success(`Valid passwords: ${chalk.bold(valid)}`);
} catch (e) {
    log.error(e);
}
