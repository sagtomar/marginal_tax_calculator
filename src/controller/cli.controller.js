const {
  calculateTaxByYear,
  calculateTaxCurrentYear,
} = require("../handler/calculator.handler");

/**
 * @description Initiate the Tax calculation on the basis of Salary with Recent Tax Bracket(Default Case)
 * @param {*} salary - Total Gross Salary provided by the User. eg. 20000
 * @returns Object containing
 * 1. Deductable Tax
 * 2. Tax Bracket Summary as an Array of Objects
 * @returnObject
 * { taxDeductable : "", taxBracketSummary : [ { min: "", max: "", rate: "", isApplied: "", amount: "" }, ... ] }
 */
function getTaxDetails(salary) {
  const data = calculateTaxCurrentYear(salary);
  return data;
}

/**
 * @description Initiate the Tax calculation on the basis of Salary and Year provided for Tax Bracket
 * @param {*} salary - Total Gross Salary provided by the User. eg. 20000
 * @param {*} year - Year provided by User for opting specific Tax Bracket Rule. eg. 2019
 * @returns Object containing
 * 1. Deductable Tax
 * 2. Tax Bracket Summary as an Array of Objects
 * @retrunObject
 * { taxDeductable : "", taxBracketSummary : [ { min: "", max: "", rate: "", isApplied: "", amount: "" }, ... ] }
 */
function getTaxDetailsByYear(salary, year) {
  const data = calculateTaxByYear(salary, year);
  return data;
}


module.exports = { getTaxDetails, getTaxDetailsByYear };
