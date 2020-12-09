import fs from "fs";
import os from "os";
import path from "path";
import _ from "lodash";
import eol from "eol";
import { log } from "../../../utils";
import chalk from "chalk";

const PREAMBLE = 25;

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = eol.auto(input.toString());

    const numbers = _(text).split(os.EOL).map(Number).value();
    let current = 0;

    // Loop through each number of the input, starting from the PREAMBLE
    for (current = PREAMBLE; current < numbers.length; ++current) {
        // Set the current evaluated number's index
        const currentNumber = numbers[current];

        // Get the {PREAMBLE} numbers before the current index
        const previous = numbers.slice(current - PREAMBLE, current);

        // Loop through each previous number and find one that sums up with another previous number to the currentNumber
        const valid = _.some(previous, (number, i) => {
            // Try the sum of the previous number with every previous numbers (except itself). The result expected should be the currentNumber.
            for (let j = 0; j < previous.length; ++j) {
                if (j == i) continue; // Can't sum with itself
                if (previous[j] + number == currentNumber) return true;
            }

            return false;
        });

        if (!valid) break;
    }

    log.success(`Faulty number: ${chalk.bold(numbers[current])}`);
} catch (e) {
    log.error(e);
}
