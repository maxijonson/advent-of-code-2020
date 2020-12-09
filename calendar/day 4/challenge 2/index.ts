import fs from "fs";
import os from "os";
import eol from "eol";
import path from "path";
import _ from "lodash";
import { log } from "../../../utils";
import chalk from "chalk";

const FIELDS = {
    byr: {
        name: "Birth Year",
        validate: (value: string) => {
            const n = Number(value);
            return n >= 1920 && n <= 2002;
        },
        required: true,
    },
    iyr: {
        name: "Issue Year",
        validate: (value: string) => {
            const n = Number(value);
            return n >= 2010 && n <= 2020;
        },
        required: true,
    },
    eyr: {
        name: "Expiration Year",
        validate: (value: string) => {
            const n = Number(value);
            return n >= 2020 && n <= 2030;
        },
        required: true,
    },
    hgt: {
        name: "Height",
        validate: (value: string) => {
            if (!/^\d{2,3}(cm|in)$/g.test(value)) return false;
            const n = Number(value.replace(/(cm|in)/g, ""));

            if (value.includes("cm")) {
                return n >= 150 && n <= 193;
            }

            return n >= 59 && n <= 76;
        },
        required: true,
    },
    hcl: {
        name: "Hair Color",
        validate: (value: string) => {
            return /^#([0-9]|[a-f]){6}$/g.test(value);
        },
        required: true,
    },
    ecl: {
        name: "Eye Color",
        validate: (value: string) => {
            return _.includes(
                ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"],
                value
            );
        },
        required: true,
    },
    pid: {
        name: "Passport ID",
        validate: (value: string) => {
            return /^\d{9}$/g.test(value);
        },
        required: true,
    },
    cid: {
        name: "Country ID",
        validate: (_v: string) => true,
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

const isValid = (passport: Passport) =>
    _.every(FIELDS, (field, key) => {
        if (field.required) {
            const value = passport[key as keyof Passport];
            return value ? field.validate(value) : false;
        }
        return true;
    });

try {
    const input = fs.readFileSync(path.join(__dirname, "input.txt"));
    const text = eol.auto(input.toString());

    const paragraphExp = new RegExp(`${os.EOL}${os.EOL}`, "g");
    const lineExp = new RegExp(os.EOL, "g");

    const unparsedPassports = _(text)
        .replace(paragraphExp, ";")
        .replace(lineExp, " ")
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
