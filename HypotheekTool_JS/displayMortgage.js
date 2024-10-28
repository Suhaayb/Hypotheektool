if (typeof module !== 'undefined' && module.exports) {
  calculateMortgage = require('./calculateMortgage');
} else {
  calculateMortgage = window.calculateMortgage;
}

function displayMortgage() {
  const income = parseFloat(document.getElementById('income').value);
  const partnerIncome =
    parseFloat(document.getElementById('partnerIncome').value) || 0;
  const postcode = document.getElementById('postcode').value;
  const fixedRatePeriod = parseInt(
    document.getElementById('fixedRatePeriod').value
  );
  const hasStudyDebt = document.getElementById('hasStudyDebt').checked;

  const result = calculateMortgage(
    income,
    partnerIncome,
    postcode,
    fixedRatePeriod,
    hasStudyDebt
  );

  if (typeof result === 'string') {
    document.getElementById('result').textContent = result;
  } else {
    document.getElementById('result').innerHTML = `
      ${result.maxMortgage} <br>
      ${result.monthlyPayment} <br>
      ${result.totalPaid} <br>
      ${result.monthlyInterest} <br>
      ${result.monthlyPrincipal}
    `;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = displayMortgage;
}

if (typeof window !== 'undefined') {
  window.displayMortgage = displayMortgage;
}
