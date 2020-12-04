import fs from "fs";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

const SLOPES = [
    { right: 1, down: 1 },
    { right: 3, down: 1 },
    { right: 5, down: 1 },
    { right: 7, down: 1 },
    { right: 1, down: 2 },
];

const TREE = "#";
const EMPTY = ".";

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = input.toString();
    const lines = text.split("\n");

    const answer = _.reduce(
        SLOPES,
        (acc, slope, i) => {
            log.info(`Slope ${i + 1}`);
            const pos = { x: 0, y: 0 };
            let counter = 0;

            for (let row = 0; row < lines.length; row += 1) {
                pos.y = row * slope.down;
                const col = row * slope.right;

                const line = lines[pos.y];

                if (!line || line.length == 0) {
                    break;
                }

                pos.x = col % line.length;

                if (isNaN(pos.x)) {
                    log.error(`${pos.x} is not a number`);
                }

                const square = line[pos.x];

                if (square != TREE && square != EMPTY) {
                    log.error(`${square} is not valid`);
                }

                if (square == TREE) {
                    ++counter;
                }
            }

            log.info(`${counter}\n`);
            acc *= counter;
            counter = 0;

            return acc;
        },
        1
    );

    log.success(`Trees encountered: ${chalk.bold(answer)}`);
} catch (e) {
    log.error(e);
}
