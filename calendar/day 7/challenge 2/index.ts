import fs from "fs";
import os from "os";
import eol from "eol";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

const BAGS_CONTAIN = "bags contain";
const MY_BAG = "shiny gold";

interface ContainedBag {
    color: string;
    amount: number;
}

type ContainedBags = { [color: string]: ContainedBag };

interface Bag {
    color: string;
    contains: ContainedBags;
}

type Bags = { [color: string]: Bag };

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = eol.auto(input.toString());

    const bagDict = _(text)
        .split(os.EOL)
        .reduce((bags, line) => {
            // Parse container bag color
            const color = line.slice(0, line.indexOf(BAGS_CONTAIN)).trim();

            // Register color
            if (!bags[color]) {
                bags[color] = { color, contains: {} };
            }

            // Slice to container items
            line = line
                .slice(line.indexOf(BAGS_CONTAIN) + BAGS_CONTAIN.length)
                .trim();

            // Stop
            if (line.includes("no other bags")) {
                return bags;
            }

            // Register contained bag info
            _(line)
                .split(",")
                .forEach((bagInfo) => {
                    bagInfo = bagInfo.trim();

                    const amount = Number(
                        bagInfo.slice(0, bagInfo.indexOf(" ")).trim()
                    );

                    const containedColor = bagInfo
                        .slice(bagInfo.indexOf(" "), bagInfo.indexOf("bag"))
                        .trim();

                    bags[color].contains[containedColor] = {
                        color: containedColor,
                        amount,
                    };
                });

            return bags;
        }, {} as Bags);

    const countIndividualBags = (bag: Bag) => {
        return _.reduce(
            bag.contains,
            (acc, containedBag) => {
                acc +=
                    containedBag.amount +
                    containedBag.amount *
                        countIndividualBags(bagDict[containedBag.color]);
                return acc;
            },
            0
        );
    };

    log.success(
        `Individual bags in my ${MY_BAG} bag: ${chalk.bold(
            countIndividualBags(bagDict[MY_BAG])
        )}`
    );
} catch (e) {
    log.error(e);
}
