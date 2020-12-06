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
        (acc, group, i) => {
            const persons = group.split(",");
            const answers = persons.join("").split("");
            const questions = _.uniq(answers);

            log.info(`Group ${i + 1}: ${questions.length}`);

            return acc + questions.length;
        },
        0
    );

    log.success(`Count: ${chalk.bold(count)}`);
} catch (e) {
    log.error(e);
}
