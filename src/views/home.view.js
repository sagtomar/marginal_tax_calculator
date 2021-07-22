const inquirer = require("inquirer");
const {
  decimalInput,
  yearInput,
  listSelection,
} = require("./elements/ui.elements");

/**
 * @description - Render Elements for Home Screen and Takes user input
 * @returns - UI for Home Screen
 */
async function promptForOptions() {
  const primaryQuestions = [];
  const subQuestions = [];

  /** Salary Input */
  primaryQuestions.push(
    decimalInput(
      "salary",
      "Please enter your overall gross salary (eg. 12000):",
      "  $"
    )
  );

  /** @description Year Selection Choice List */
  const yearOptions = [
    "Recent Tax Bracket",
    "Enter year for Tax Bracket (eg. 2019)",
  ];
  primaryQuestions.push(
    listSelection(
      "optionSelected",
      "Please choose the Tax Bracket for calculating Tax Deductions:",
      yearOptions
    )
  );

  /** @description - Collecting input from User */
  const answers = await inquirer.prompt(primaryQuestions);
  let year = 1;

  if (answers.optionSelected === "Enter year for Tax Bracket (eg. 2019)") {
    subQuestions.push(yearInput("year", "Please enter year (eg. 2019):"));

    const yearEntered = await inquirer.prompt(subQuestions);
    year = yearEntered.year;
  }

  const data = {
    salary: answers.salary,
    year,
  };
  return data;
}

module.exports = { promptForOptions };
