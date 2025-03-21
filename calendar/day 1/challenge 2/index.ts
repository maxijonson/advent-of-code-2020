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

    const nums = _(text)
        .split(os.EOL)
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
    let third: number = 0;

    const foundAnswer = _.some(nums, (n1, i) => {
        first = n1;
        const foundSecond = _.some(nums, (n2, j) => {
            if (i == j) return false;
            second = n2;

            const foundThird = _.some(nums, (n3, k) => {
                if (i == k || j == k) return false;
                third = n3;
                return first + second + third == 2020;
            });

            return foundThird;
        });
        return foundSecond;
    });

    if (foundAnswer) {
        log.success(
            `${first} x ${second} x ${third} = ${chalk.bold(
                first * second * third
            )}`
        );
    } else {
        log.error("Answer not found... 😢");
    }
} catch (e) {
    log.error(e);
}
