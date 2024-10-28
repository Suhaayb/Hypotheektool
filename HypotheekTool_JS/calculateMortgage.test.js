const calculateMortgage = require('./calculateMortgage');

test('should calculate mortgage correctly for single income', () => {
  const result = calculateMortgage(50000, 0, '1235AB', 10, false);
  expect(result.maxMortgage).toBe('Uw maximale hypotheek is: €225000.00');
});

test('should calculate reduced mortgage for combined income with study debt', () => {
  const result = calculateMortgage(50000, 30000, '1235AB', 10, true);
  expect(result.maxMortgage).toBe('Uw maximale hypotheek is: €270000.00');
});

test('should calculate mortgage correctly for combined income', () => {
  const result = calculateMortgage(50000, 30000, '1235AB', 10, false);
  expect(result.maxMortgage).toBe('Uw maximale hypotheek is: €360000.00');
});

test('should return error for invalid income', () => {
  const result = calculateMortgage(-1000, 0, '1235AB', 10, false);
  expect(result).toBe('Voer een geldig inkomen in.');
});

test('should return error for forbidden postcode', () => {
  const result = calculateMortgage(50000, 0, '9679AB', 10, false);
  expect(result).toBe('Uw postcode is niet toegestaan voor een hypotheek.');
});
test('should return error for invalid fixedRatePeriod', () => {
  const result = calculateMortgage(50000, 0, '1235AB', 15, false);
  expect(result).toBe('Ongeldige rentevaste periode gekozen.');
});

test('should calculate reduced mortgage for study debt', () => {
  const result = calculateMortgage(50000, 0, '1235AB', 10, true);
  expect(result.maxMortgage).toBe('Uw maximale hypotheek is: €168750.00');
});
