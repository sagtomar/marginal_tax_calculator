/** Setup */

const taxCalculatorSetup = {
  taxBrackets1: [
    { max: 9950, min: 0, rate: 0.1 },
    { max: 40525, min: 9950, rate: 0.12 },
    { max: 86375, min: 40525, rate: 0.22 },
    { max: 164925, min: 86375, rate: 0.24 },
    { max: 209425, min: 164925, rate: 0.32 },
    { max: 523600, min: 209425, rate: 0.35 },
    { min: 523600, rate: 0.37 },
  ],
  salary1: 150000,
  result1: 30021,
  taxBrackets2: [
    { max: 48535, min: 0, rate: 0.15 },
    { max: 97069, min: 48535, rate: 0.2 },
    { max: 150473, min: 97069, rate: 0.26 },
    { max: 214368, min: 150473, rate: 0.29 },
    { min: 214368, rate: "0.33" },
  ],
  salary2: 25000,
  result2: 3750,
  negativeSalary1: 125000,
  negativeSalary2: 15000,
};

module.exports = { taxCalculatorSetup };
