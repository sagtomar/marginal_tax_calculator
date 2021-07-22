/**
 * @description - Helper function to convert Integer value in quotes to Integer Value 
 * @param {*} value - Interger/ Float value for conversion
 * @returns - comma separated value, "XXXXXXX" --> XXXXXXX
 */
function stringToInteger(value) {
  let intValue;
  try {
    intValue = parseInt(value, 10);
  } catch (err) {
    console.log(err.message);
  }
  return intValue;
}

/**
 * @description - Helper function to convert Integer value in quotes to Float Value 
 * @param {*} value - Interger/ Float value for conversion
 * @returns - comma separated value, "XXXXXXX.XX" --> XXXXXXX.XX
 */
function stringToFloat(value) {
  let floatValue;
  try {
    floatValue = parseFloat(value);
  } catch (err) {
    console.log(err.message);
  }
  return floatValue;
}

/**
 * @description - Helper function to make Integer/ Float values comma separated US/ Canada currency format
 * @param {*} value - Interger/ Float value for conversion
 * @returns - comma separated value, XXXXXXX.XX --> X,XXX,XXX.XX
 */
function toCommaSepartedValue(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

module.exports = { stringToInteger, stringToFloat, toCommaSepartedValue };
