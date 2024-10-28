const displayMortgage = require('./displayMortgage');
require('@testing-library/jest-dom');
const { fireEvent } = require('@testing-library/dom');

document.body.innerHTML = `
  <div class="container">
      <h1>Bereken uw maximale hypotheek</h1>
      <div class="form-group">
          <label for="income">Voer uw jaarlijkse inkomen in:</label>
          <input type="number" id="income" placeholder="Uw inkomen">
      </div>
      <div class="form-group">
          <label for="partnerIncome">Heeft u een partner? Voer het inkomen van uw partner in (optioneel):</label>
          <input type="number" id="partnerIncome" placeholder="Partner inkomen">
      </div>
      <div class="form-group">
          <label for="postcode">Voer uw postcode in:</label>
          <input type="text" id="postcode" placeholder="1234AB">
      </div>
      <div class="form-group">
          <label for="fixedRatePeriod">Kies uw rentevaste periode:</label>
          <select id="fixedRatePeriod">
              <option value="1">1 jaar - 2%</option>
              <option value="5">5 jaar - 3%</option>
              <option value="10">10 jaar - 3.5%</option>
              <option value="20">20 jaar - 4.5%</option>
              <option value="30">30 jaar - 5%</option>
          </select>
      </div>
      <div class="form-group">
          <label for="hasStudyDebt">Heeft u een studieschuld?</label>
          <input type="checkbox" id="hasStudyDebt" />
      </div>
      <button class="calculate-btn" onclick="displayMortgage()">Bereken Hypotheek</button>
      <p id="result"></p>
  </div>
`;

test('should calculate and display reduced mortgage for combined income with study debt in DOM', () => {
  document.getElementById('income').value = 50000;
  document.getElementById('partnerIncome').value = 30000;
  document.getElementById('postcode').value = '1235AB';
  document.getElementById('fixedRatePeriod').value = '10';
  document.getElementById('hasStudyDebt').checked = true;

  displayMortgage();

  const resultElement = document.getElementById('result');
  expect(resultElement).toHaveTextContent(
    'Uw maximale hypotheek is: €270000.00'
  );
});

test('should calculate mortgage and display result in DOM', () => {
  document.getElementById('income').value = 50000;
  document.getElementById('partnerIncome').value = 30000;
  document.getElementById('postcode').value = '1235AB';
  document.getElementById('fixedRatePeriod').value = '10';
  document.getElementById('hasStudyDebt').checked = false;

  displayMortgage();

  const resultElement = document.getElementById('result');
  expect(resultElement).toHaveTextContent(
    'Uw maximale hypotheek is: €360000.00'
  );
});

test('should display error for invalid income in DOM', () => {
  document.getElementById('income').value = -1000;
  document.getElementById('partnerIncome').value = 0;
  document.getElementById('postcode').value = '1235AB';
  document.getElementById('fixedRatePeriod').value = '10';
  document.getElementById('hasStudyDebt').checked = false;

  displayMortgage();

  const resultElement = document.getElementById('result');
  expect(resultElement).toHaveTextContent('Voer een geldig inkomen in.');
});

test('should display error for forbidden postcode in DOM', () => {
  document.getElementById('income').value = 50000;
  document.getElementById('partnerIncome').value = 0;
  document.getElementById('postcode').value = '9679AB';
  document.getElementById('fixedRatePeriod').value = '10';
  document.getElementById('hasStudyDebt').checked = false;

  displayMortgage();

  const resultElement = document.getElementById('result');
  expect(resultElement).toHaveTextContent(
    'Uw postcode is niet toegestaan voor een hypotheek.'
  );
});
