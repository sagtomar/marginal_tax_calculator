const inquirer = require("inquirer");
const { listSelection } = require("./elements/ui.elements");

/**
 * @description - Function to take user input for further processing
 * @returns - boolean value to take decision to re-run or exit CLI
 */
async function promptForConfirmation() {
  const questions = [];

  /** Redo Choice List */
  const redoOptions = ["Yes", "No"];
  questions.push(
    listSelection(
      "option",
      "Do you want to calculate Tax for another Salary?",
      redoOptions
    )
  );

  /** @description -  User Inputs */
  const answers = await inquirer.prompt(questions);

  const data = answers.option === "Yes";

  return data;
}

module.exports = { promptForConfirmation };
