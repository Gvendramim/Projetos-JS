const apiKey = 'b191bf04dc113c33085d0978';
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

async function getCurrencies() {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    const currencies = Object.keys(data.conversion_rates);

    currencies.forEach(currency => {
      const option1 = new Option(currency, currency);
      const option2 = new Option(currency, currency);
      fromCurrency.appendChild(option1);
      toCurrency.appendChild(option2);
    });

    fromCurrency.value = 'USD';
    toCurrency.value = 'BRL';
  } catch (error) {
    result.textContent = 'Erro ao carregar moedas.';
  }
}

async function convertCurrency() {
  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;
  const amountValue = parseFloat(amount.value);

  if (!amountValue || amountValue <= 0) {
    result.textContent = 'Insira um valor válido';
    return;
  }

  try {
    const response = await fetch(`${apiURL}?base=${fromValue}`);
    const data = await response.json();
    const rate = data.conversion_rates[toValue];
    const convertedAmount = (amountValue * rate).toFixed(2);
    result.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
  } catch {
    result.textContent = 'Erro na conversão.';
  }
}

convertBtn.addEventListener('click', convertCurrency);
getCurrencies();
