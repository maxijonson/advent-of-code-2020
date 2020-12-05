import fs from "fs";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = input.toString();
    const passes = _(text).split("\r\n").compact().value();

    const seatIds = _.map(passes, (pass) => {
        if (pass.length != 10) {
            throw new Error(`'${pass}' doesn't have a valid length`);
        }

        const partRow = pass.slice(0, 7);
        const partCol = pass.slice(7);

        let lower = 0;
        let upper = 127;
        let row = -1;

        _.forEach(partRow, (dir, i) => {
            if (i == partRow.length - 1) {
                row = dir == "F" ? lower : upper;
                return;
            }

            const delta = upper - lower;

            if (dir == "F") {
                upper -= Math.round(delta / 2);
            } else {
                lower += Math.round(delta / 2);
            }
        });

        if (row == -1) {
            throw new Error("Row not found");
        }

        lower = 0;
        upper = 7;
        let col = -1;

        _.forEach(partCol, (dir, i) => {
            if (i == partCol.length - 1) {
                col = dir == "L" ? lower : upper;
                return;
            }

            const delta = upper - lower;

            if (dir == "L") {
                upper -= Math.round(delta / 2);
            } else {
                lower += Math.round(delta / 2);
            }
        });

        if (col == -1) {
            throw new Error("Column not found");
        }

        return row * 8 + col;
    });

    const sortedIds = _.sortBy(seatIds);

    if (sortedIds.length == 0) {
        throw new Error("No seat IDs!");
    }

    let seat = sortedIds[0];

    for (let i = 0; i < sortedIds.length; ++i) {
        if (sortedIds[i] != seat) {
            break;
        }
        seat++;
    }

    log.success(`My seat ID: ${chalk.bold(seat)}`);
} catch (e) {
    log.error(e);
}
