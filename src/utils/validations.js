/**
 * @description - Helper function to validate User Input data for Valid Integer/ Float Values
 * @param {*} input - User input, expected as XX or XX.XX
 * @returns - boolean true/false after valdating
 */
function isValidNumber(input) {
  let isValid = false;
  try {
    if (input.trim().length > 0 && input.trim().match(/^[0-9]*(\.[0-9]+)?$/))
      isValid = true;
  } catch (err) {
    isValid = false;
  }
  return isValid;
}

/**
 * @description - Helper function to validate User Input data for Year
 * @param {*} input - User input, expected as Year YYYY
 * @returns - boolean true/false after valdating
 */
function isValidYear(input) {
  let isValid = false;
  try {
    if (input.trim().length > 0 && input.trim().match(/(?:19|20)[0-9]{2}/))
      isValid = true;
  } catch (err) {
    isValid = false;
  }
  return isValid;
}
module.exports = { isValidNumber, isValidYear };
