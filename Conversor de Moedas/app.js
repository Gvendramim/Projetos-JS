const apiKey = 'b191bf04dc113c33085d0978'; 
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const result = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');

// Obtenha códigos de Moeda 
async function getCurrencies() {
  const response = await fetch(apiURL);
  const data = await response.json();
  
  const currencies = Object.keys(data.conversion_rates);
  
  currencies.forEach(currency => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = currency;
    option2.value = currency;
    option1.text = currency;
    option2.text = currency;
    fromCurrency.add(option1);
    toCurrency.add(option2);
  });
}

// Converte 
async function convertCurrency() {
  const fromValue = fromCurrency.value;
  const toValue = toCurrency.value;
  const amountValue = amount.value;

  if (amountValue === '' || isNaN(amountValue)) {
    result.textContent = 'Insira um valor válido';
    return;
  }

  const response = await fetch(`${apiURL}?base=${fromValue}`);
  const data = await response.json();
  const rate = data.conversion_rates[toValue];
  
  const convertedAmount = (amountValue * rate).toFixed(2);
  result.textContent = `${amountValue} ${fromValue} = ${convertedAmount} ${toValue}`;
}

convertBtn.addEventListener('click', convertCurrency);

getCurrencies();
