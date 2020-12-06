import fs from "fs";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = input.toString();
    const groups = _(text)
        .replace(/\r\n\r/g, ";")
        .replace(/\r\n/g, ",")
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
