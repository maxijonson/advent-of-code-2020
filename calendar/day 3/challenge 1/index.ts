import fs from "fs";
import os from "os";
import eol from "eol";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

const RIGHT = 3;
const DOWN = 1;
const TREE = "#";

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = eol.auto(input.toString());

    const pos = { x: 0, y: 0 };
    const lines = text.split(os.EOL);

    let counter = 0;

    for (let row = 0; row < lines.length; row += DOWN) {
        pos.y = row;
        const col = row * RIGHT;

        const line = lines[pos.y];
        if (line.length == 0) {
            break;
        }

        pos.x = col % line.length;
        const square = line[pos.x];

        if (square == TREE) {
            ++counter;
        }
    }

    log.success(`Trees encountered: ${chalk.bold(counter)}`);
} catch (e) {
    log.error(e);
}
