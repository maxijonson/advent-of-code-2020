import fs from "fs";
import path from "path";
import _ from "lodash";
import { log } from "../../utils";
import chalk from "chalk";

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = input.toString();

    const nums = _(text)
        .split("\n")
        .map((n) => {
            const number = Number(n);
            if (isNaN(number)) {
                throw new Error(`${n} is not a number`);
            }
            return number;
        })
        .value();

    let first: number = 0;
    let second: number = 0;

    const foundAnswer = _.some(nums, (n1, i) => {
        first = n1;
        const foundSecond = _.some(nums, (n2, j) => {
            if (i == j) return false;
            second = n2;
            return first + second == 2020;
        });
        return foundSecond;
    });

    if (foundAnswer) {
        log.success(`${first} x ${second} = ${chalk.bold(first * second)}`);
    } else {
        log.error("Answer not found... 😢");
    }
} catch (e) {
    log.error(e);
}
