import chalk from "chalk";

export const error = (msg: any) => console.error(chalk.red(msg));
export const warn = (msg: any) => console.error(chalk.yellow(msg));
export const info = (msg: any) => console.error(chalk.cyan(msg));
export const success = (msg: any) => console.error(chalk.greenBright(msg));
