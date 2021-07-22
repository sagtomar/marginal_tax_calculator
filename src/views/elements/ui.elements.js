const { isValidNumber, isValidYear } = require("../../utils/validations");

/**
 * @description - UI Element for Decimal Values with Validation
 * @param {*} name - Name of the Element
 * @param {*} message - Message to display on prompt
 * @param {*} suffixValue - any sign or value before User input. eg. $ for curreny input
 * @returns - input value provided by User
 */
const decimalInput = (name, message, suffixValue) => {
  const input = {
    name,
    type: "input",
    message,
    validate(value) {
      if (isValidNumber(value)) {
        return true;
      }
      return "Please enter valid Amount in Numeric Value,  eg. 12000.00";
    },
    suffix: suffixValue || "",
  };

  return input;
};

/**
 * @description - UI Element for entering Year Value with Validation
 * @param {*} name - Name of the Element
 * @param {*} message - Message to display on prompt
 * @returns - input value provided by User
 */
const yearInput = (name, message) => {
  const input = {
    name,
    type: "input",
    message,
    validate(value) {
      if (isValidYear(value)) {
        return true;
      }
      return "Please enter valid Year Value,  eg. 2019";
    },
  };

  return input;
};

/**
 * @description - UI Element to give options from Array to choose one item
 * @param {*} name - Name of the Element
 * @param {*} message - Message to display on prompt
 * @param {*} choices - Array of choices
 * @returns - List value selected by User
 */
const listSelection = (name, message, choices) => {
  const input = {
    name,
    type: "list",
    message,
    choices,
  };
  return input;
};

module.exports = { decimalInput, yearInput, listSelection };
