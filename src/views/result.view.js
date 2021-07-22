const chalk = require("chalk");
const Table = require("cli-table");
const { toCommaSepartedValue } = require("../utils/type_convertor");

/**
 * @description - Prints Table for Array of Objects with multiple key-value pairs in each object
 * @param {*} inputArray - Array of Objects for Tax Summary
 */
function printTable(inputArray) {
  let setHeader = true;
  const table = new Table();
  try {
    inputArray.forEach((item) => {
      if (setHeader) {
        table.push(Object.keys(item));
        setHeader = false;
      }
      table.push(Object.values(item));
    });

    console.info(table.toString());
  } catch (err) {
    if (err.name === "TypeError") console.debug(inputArray);
  }
}

/**
 * @description -  Display Result: 1. Total Deductable, 2. Tax Brackets Applied
 * @param {*} calculatedResult - contains Object with printable data
 */
function printResult(calculatedResult) {
  if (calculatedResult.message) {
    console.log(calculatedResult.message);
  } else {
    console.log(
      chalk.blueBright(
        `\n\n_____________________________________________________________\n\n`
      )
    );

    console.log(
      `\n\nYour total deductable tax amount as per ${
        calculatedResult.year
      } Tax Bracket Chart is ${chalk.green(
        "$",
        toCommaSepartedValue(calculatedResult.totalDeductable)
      )}\n\n\n`
    );

    console.log(chalk.blueBright(`Tax Deduction Summary`));
    printTable(calculatedResult.taxDeductionSummary);

    console.log(
      `\n\nYour Effective Tax Rate is ${chalk.green(
        calculatedResult.effectiveRate
      )}\n\n\n`
    );

    console.log(
      chalk.blueBright(
        `\n\n_____________________________________________________________\n\n`
      )
    );
  }
}

module.exports = { printResult };
