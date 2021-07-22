const assert = require("assert");

const { calculateTax } = require("../src/handler/calculator.handler");
const { taxCalculatorSetup } = require("./calculator.setup");

/**
 * @description - Test for Tax Calculator Function
 */
describe("Tax Calculator - Positive Test Case 1", function () {
  describe("#calculateTax(salary, taxBrackets)", function () {
    it("Should return taxable amount for the salary", function () {
      assert.equal(
        calculateTax(
          taxCalculatorSetup.salary1,
          taxCalculatorSetup.taxBrackets1
        ),
        taxCalculatorSetup.result1
      );
    });
  });
});

describe("Tax Calculator - Positive Test Case 2 with Decimal value as String", function () {
  describe("#calculateTax(salary, taxBrackets)", function () {
    it("Should return taxable amount for the salary", function () {
      assert.equal(
        calculateTax(
          taxCalculatorSetup.salary2,
          taxCalculatorSetup.taxBrackets2
        ),
        taxCalculatorSetup.result2
      );
    });
  });
});

describe("Tax Calculator - Negative Test Case 1", function () {
  describe("#calculateTax(salary, taxBrackets)", function () {
    it("Should return taxable amount for the salary", function () {
      assert.notEqual(
        calculateTax(
          taxCalculatorSetup.negativeSalary1,
          taxCalculatorSetup.taxBrackets1
        ),
        taxCalculatorSetup.result1
      );
    });
  });
});

describe("Tax Calculator - Negative Test Case 2 with Decimal value as String", function () {
  describe("#calculateTax(salary, taxBrackets)", function () {
    it("Should return taxable amount for the salary", function () {
      assert.notEqual(
        calculateTax(
          taxCalculatorSetup.negativeSalary2,
          taxCalculatorSetup.taxBrackets2
        ),
        taxCalculatorSetup.result2
      );
    });
  });
});
