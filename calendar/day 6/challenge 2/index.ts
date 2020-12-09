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
            const questions = persons[0].split("");

            const yesAmount = _.reduce(
                questions,
                (yes, question) => {
                    const hasAllYes = _.every(
                        persons,
                        (person) => person.indexOf(question) != -1
                    );
                    return hasAllYes ? yes + 1 : yes;
                },
                0
            );

            return acc + yesAmount;
        },
        0
    );

    log.success(`Count: ${chalk.bold(count)}`);
} catch (e) {
    log.error(e);
}
