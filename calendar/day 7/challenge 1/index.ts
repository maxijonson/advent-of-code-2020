import fs, { access } from "fs";
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
    const text = input.toString();

    const bagDict = _(text)
        .split("\r\n")
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

    const directBags = _.reduce(
        bagDict,
        (acc, bag) => {
            if (bag.contains[MY_BAG]) {
                acc[bag.color] = bag.contains[MY_BAG].amount;
            }
            return acc;
        },
        {} as { [color: string]: number }
    );

    let validBagColors = _.keys(directBags);
    let indirectFound = -1;

    while (indirectFound != 0) {
        indirectFound = _.reduce(
            bagDict,
            (acc, bag) => {
                // Don't recount the same bag
                if (_.includes(validBagColors, bag.color)) return acc;

                const eventuallyContainsMyBag =
                    _.intersection(_.keys(bag.contains), [
                        ...validBagColors,
                        MY_BAG,
                    ]).length > 0;

                if (eventuallyContainsMyBag) {
                    validBagColors.push(bag.color);
                    return acc + 1;
                }

                return acc;
            },
            0
        );
    }

    log.success(
        `Bags that eventually contain my ${MY_BAG} bag: ${chalk.bold(
            validBagColors.length
        )}`
    );
} catch (e) {
    log.error(e);
}
