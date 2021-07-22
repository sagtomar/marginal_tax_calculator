/* eslint-disable no-param-reassign */
const {
  fetchTaxBracket,
  fetchTaxBracketByYear,
} = require("../service/fetchAPI.service");
const { toCommaSepartedValue } = require("../utils/type_convertor");

/**
 * @description Calculate the taxable income on the basis of annual income and tax brackets
 * @param {*} salary - Total Gross Salary provided by the User. eg. 20000
 * @param {*} taxBrackets - Array of Objects for Tax Bracket -->  [ { min : "", max : "", rate : "" }, ...]
 * @returns totalTaxableAmount - Total amount that will be deducted as Tax from the gross income for the provided year
 */
function calculateTax(salary, taxBrackets) {
  let totalTaxableAmount = 0;
  let taxableAmount = 0;

  // Calculate taxable Amount on the basis of salary breakdown for each bracket
  try {
    taxBrackets.forEach((item) => {
      if (!item.max) item.max = Number.MAX_VALUE;
      taxableAmount =
        salary > item.max ? item.max - item.min : salary - item.min;

      if (taxableAmount > 0) {
        totalTaxableAmount += taxableAmount * item.rate;
      }
    });

    totalTaxableAmount = parseFloat(totalTaxableAmount).toFixed(2);
  } catch (err) {
    console.log(err.message);
  }

  return totalTaxableAmount;
}

/**
 * @description - To analyse Tax deduction for each tax slab/ bracket
 * @param {*} salary - Total Gross Salary provided by the User. eg. 20000
 * @param {*} taxBrackets - Array of Objects for Tax Bracket -->  [ { min : "", max : "", rate : "" }, ...]
 * @returns - Sanitized Array of Objects for Tax Deduction Summary
 */
function generateTaxBracketSummary(salary, taxBrackets) {
  let taxableAmount = 0;
  const taxDeductionSummary = [];

  // Calculate taxable Amount on the basis of salary breakdown for each bracket
  taxBrackets.forEach((item) => {
    if (!item.max) item.max = Number.MAX_VALUE;
    taxableAmount = salary > item.max ? item.max - item.min : salary - item.min;

    if (taxableAmount > 0) {
      item.amount = taxableAmount * item.rate;
      item.isApplied = true;
    } else {
      item.amount = 0;
      item.isApplied = false;
    }

    // Sanitize values for Table
    taxDeductionSummary.push({
      Minimum_Amount_$: toCommaSepartedValue(parseFloat(item.min).toFixed(2)),
      Maximum_Amount_$:
        item.max === Number.MAX_VALUE
          ? "-"
          : toCommaSepartedValue(parseFloat(item.max).toFixed(2)),
      Tax_Rate: parseFloat(item.rate).toFixed(2),
      Taxable_Amount_$: toCommaSepartedValue(
        parseFloat(item.amount).toFixed(2)
      ),
      Tax_Applied: item.isApplied,
    });
  });

  return taxDeductionSummary;
}

/**
 * @description - Calculate Effective Tax Rate for provided Salary and Tax paid that year
 * @param {*} salary - Total Gross Salary provided by the User. eg. 20000
 * @param {*} totalTaxableAmount - Amount of tax paid as per Tax Brackets
 * @returns - Effective Rate
 */
function calculateEffectiveTaxRate(salary, totalTaxableAmount) {
  const effectiveRate = totalTaxableAmount / salary;
  return parseFloat(effectiveRate).toFixed(2);
}

/**
 * @description Fetch taxBrackets from API using "fetchAPI.service" and calculate Tax
 * @param {*} salary - Total Gross Salary provided by the User. eg. 20000
 * @returns - Object with total Deductable Tax Value and Tax Summary (Array of Objects)
 */
async function calculateTaxCurrentYear(salary) {
  const retryCounter = 0;
  try {
    const serviceResponse = await fetchTaxBracket(retryCounter);
    if (serviceResponse.status === 200) {
      const taxBrackets = serviceResponse.data.tax_brackets;
      const totalDeductable = calculateTax(salary, taxBrackets);
      const taxDeductionSummary = generateTaxBracketSummary(
        salary,
        taxBrackets
      );
      const effectiveRate = calculateEffectiveTaxRate(salary, totalDeductable);
      const data = { totalDeductable, effectiveRate, taxDeductionSummary };
      return data;
    }
    return serviceResponse;
  } catch (err) {
    const res = { message: err.message };
    return res;
  }
}

/**
 * @description Fetch specific taxBrackets from API using "fetchAPI.service" for provided year and calculate Tax
 * @param {*} salary - Total Gross Salary provided by the User. eg. 20000
 * @param {*} year - Year provided by the User for fetching specific tax bracket. eg. 2019
 * @returns - Object with total Deductable Tax Value and Tax Summary (Array of Objects)
 */
async function calculateTaxByYear(salary, year) {
  const retryCounter = 0;
  try {
    const serviceResponse = await fetchTaxBracketByYear(year, retryCounter);
    if (serviceResponse.status === 200) {
      const taxBrackets = serviceResponse.data.tax_brackets;
      const totalDeductable = calculateTax(salary, taxBrackets);
      const taxDeductionSummary = generateTaxBracketSummary(
        salary,
        taxBrackets
      );
      const effectiveRate = calculateEffectiveTaxRate(salary, totalDeductable);
      const data = { totalDeductable, effectiveRate, taxDeductionSummary };
      return data;
    }
    return serviceResponse;
  } catch (err) {
    const res = { message: err.message };
    return res;
  }
}

module.exports = {
  calculateTax,
  generateTaxBracketSummary,
  calculateEffectiveTaxRate,
  calculateTaxCurrentYear,
  calculateTaxByYear,
};
