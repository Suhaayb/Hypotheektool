function calculateMortgage(
  income,
  partnerIncome,
  postcode,
  fixedRatePeriod,
  hasStudyDebt
) {
  if (isNaN(income) || income <= 0) {
    return 'Voer een geldig inkomen in.';
  }

  const forbiddenPostcodes = ['9679', '9681', '9682'];
  if (forbiddenPostcodes.includes(postcode.substring(0, 4))) {
    return 'Uw postcode is niet toegestaan voor een hypotheek.';
  }

  const interestRates = {
    1: 0.02,
    5: 0.03,
    10: 0.035,
    20: 0.045,
    30: 0.05,
  };

  const interestRate = interestRates[fixedRatePeriod];
  if (!interestRate) {
    return 'Ongeldige rentevaste periode gekozen.';
  }

  let maxMortgage = (income + (partnerIncome || 0)) * 4.5;

  if (hasStudyDebt) {
    maxMortgage *= 0.75;
  }

  const loanTermMonths = fixedRatePeriod * 12;
  const monthlyInterestRate = interestRate / 12;
  const monthlyPayment =
    (maxMortgage * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -loanTermMonths));
  const totalPaid = monthlyPayment * loanTermMonths;

  return {
    maxMortgage: `Uw maximale hypotheek is: €${maxMortgage.toFixed(2)}`,
    monthlyPayment: `Maandelijkse betaling: €${monthlyPayment.toFixed(2)}`,
    totalPaid: `Totaal te betalen bedrag na ${fixedRatePeriod} jaar: €${totalPaid.toFixed(
      2
    )}`,
    monthlyInterest: `Maandelijkse rente: €${(
      monthlyPayment * interestRate
    ).toFixed(2)}`,
    monthlyPrincipal: `Maandelijkse aflossing: €${(
      monthlyPayment -
      monthlyPayment * interestRate
    ).toFixed(2)}`,
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = calculateMortgage;
}

if (typeof window !== 'undefined') {
  window.calculateMortgage = calculateMortgage;
}
