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

    const paragraphExp = new RegExp(`${os.EOL}${os.EOL}`, "g");
    const lineExp = new RegExp(os.EOL, "g");

    const groups = _(text)
        .replace(paragraphExp, ";")
        .replace(lineExp, ",")
        .split(";")
        .map((line) => line.trim());

    const count = _.reduce(
        groups,
        (acc, group) => {
            const persons = group.split(",");
            const answers = persons.join("").split("");
            const questions = _.uniq(answers);

            return acc + questions.length;
        },
        0
    );

    log.success(`Count: ${chalk.bold(count)}`);
} catch (e) {
    log.error(e);
}
