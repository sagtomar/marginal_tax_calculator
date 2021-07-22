require("dotenv").config();
const chalk = require("chalk");
const figlet = require("figlet");
const clear = require("clear");

const { promptForOptions } = require("./src/views/home.view");
const { promptForConfirmation } = require("./src/views/confirmation.view");
const { printResult } = require("./src/views/result.view");
const {
  getTaxDetails,
  getTaxDetailsByYear,
} = require("./src/controller/cli.controller");

/**
 * @description Main Function - Starting Point
 */
const main = async () => {
  let isTerminated = false;

  clear();

  /** @description - Header for CLI */
  console.info(chalk.cyan(figlet.textSync("Tax Calculator")));

  /** @description Render UI elements for CLI */
  const selection = await promptForOptions();

  /** @description Calls Controller to initiate Tax calculation on the basis of User input in "selection" */
  const calculatedResult =
    selection.year === 1
      ? await getTaxDetails(selection.salary)
      : await getTaxDetailsByYear(selection.salary, selection.year);

  calculatedResult.year = selection.year === 1 ? "recent" : selection.year;

  printResult(calculatedResult);

  /** @description Option to Calculation again */
  isTerminated = await promptForConfirmation();
  if (isTerminated) {
    main();
  }
};

main();
