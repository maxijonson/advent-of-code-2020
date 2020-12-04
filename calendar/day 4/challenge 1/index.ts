import fs from "fs";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

const FIELDS = {
    byr: {
        name: "Birth Year",
        required: true,
    },
    iyr: {
        name: "Issue Year",
        required: true,
    },
    eyr: {
        name: "Expiration Year",
        required: true,
    },
    hgt: {
        name: "Height",
        required: true,
    },
    hcl: {
        name: "Hair Color",
        required: true,
    },
    ecl: {
        name: "Eye Color",
        required: true,
    },
    pid: {
        name: "Passport ID",
        required: true,
    },
    cid: {
        name: "Country ID",
        required: false,
    },
};
type Passport = { [key in keyof typeof FIELDS]?: string };

const parsePassport = (text: string): Passport => {
    const passport: Passport = {};

    _(text)
        .replace(/\n/g, " ")
        .split(" ")
        .forEach((pair) => {
            const [key, value] = _.split(pair, ":");
            passport[key as keyof Passport] = value;
        });

    return passport;
};

const isValid = (passport: Passport) => _.every(FIELDS, (field, key) => {
    if (field.required) {
        return !!passport[key as keyof Passport];
    }
    return true;
})

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = input.toString();

    const unparsedPassports = _(text)
        .replace(/\r\n\r/g, ";")
        .replace(/\r\n/g, " ")
        .split(";")
        .map((line) => line.trim());

    const passports = _.map(unparsedPassports, parsePassport);

    const valid = _.reduce(
        passports,
        (acc, passport) => {
            return isValid(passport) ? acc + 1 : acc;
        },
        0
    );

    log.success(`Valid passports: ${chalk.bold(valid)}`);
} catch (e) {
    log.error(e);
}
