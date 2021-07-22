const { instance } = require("../config/axios/axiosConfig");

/**
 * [HTTP GET]
 * @description Get Tax brackets for current year
 * @param {*} retryCounter - To retry connection in case of connectivity or internal server issue
 * @returns tax_brackets - array of objects [{min:'', max:'', rate:''}]
 */
async function fetchTaxBracket(retryCounter) {
  let res = {};
  try {
    res = await instance.get("/tax-calculator/brackets", {
      timeout: 5000,
    });
  } catch (err) {
    if (retryCounter < 3) {
      console.log(`Retrying ${retryCounter + 1}...`);
      res = await fetchTaxBracket(retryCounter + 1);
    }
    res.message = err.message;
  }
  return res;
}

/**
 * [HTTP GET]
 * @description Get Tax brackets by Year as provided by the User
 * @param {*} year - Year provided by User for opting specific Tax Bracket Rule. eg. 2019
 * @param {*} retryCounter - To retry connection in case of connectivity or internal server issue
 * @returns tax_brackets - array of objects [{min:'', max:'', rate:''}]
 */
async function fetchTaxBracketByYear(year, retryCounter) {
  let res = {};
  try {
    res = await instance.get(`/tax-calculator/brackets/${year}`, {
      timeout: 5000,
    });
  } catch (err) {
    if (retryCounter < 3) {
      console.log(`Retrying ${retryCounter + 1}...`);
      res = await fetchTaxBracketByYear(year, retryCounter + 1);
    }
    res.message = err.message;
  }
  return res;
}

module.exports = { fetchTaxBracket, fetchTaxBracketByYear };
