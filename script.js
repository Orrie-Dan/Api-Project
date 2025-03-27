document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const convertBtn = document.getElementById('convertBtn');
    const resultDiv = document.getElementById('result');
    const rateInfoDiv = document.getElementById('rateInfo');

    const CURRENCIES = [
        { code: 'USD', name: 'US Dollar', country: 'us' },
        { code: 'EUR', name: 'Euro', country: 'eu' },
        { code: 'GBP', name: 'British Pound', country: 'gb' },
        { code: 'JPY', name: 'Japanese Yen', country: 'jp' },
        { code: 'CAD', name: 'Canadian Dollar', country: 'ca' },
        { code: 'AUD', name: 'Australian Dollar', country: 'au' },
        { code: 'CHF', name: 'Swiss Franc', country: 'ch' },
        { code: 'CNY', name: 'Chinese Yuan', country: 'cn' },
        { code: 'INR', name: 'Indian Rupee', country: 'in' },
        { code: 'BRL', name: 'Brazilian Real', country: 'br' },
        { code: 'RWF', name: 'Rwandan Franc', country: 'rw' },
        { code: 'KES', name: 'Kenyan Shilling', country: 'ke' }
    ];

    function populateCurrencies() {
        CURRENCIES.forEach(currency => {
            const option1 = document.createElement('option');
            const option2 = document.createElement('option');

            option1.textContent = `${currency.code} - ${currency.name}`;
            option1.value = currency.code;

            option2.textContent = `${currency.code} - ${currency.name}`;
            option2.value = currency.code;

            fromCurrencySelect.appendChild(option1);
            toCurrencySelect.appendChild(option2);
        });

        // default currencies selections
        fromCurrencySelect.value = 'USD';
        toCurrencySelect.value = 'EUR';
    }

    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (isNaN(amount) || amount <= 0) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        try {
            const API_KEY = '6b77c97127a28e6babece4ac';
            const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`;

            const response = await fetch(API_URL)
            const data = await response.json();

            if (data.result === 'success') {

                const conversionRate = data.conversion_rates[toCurrency];

                const convertedAmount = (amount * conversionRate).toFixed(2);

                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                rateInfoDiv.textContent = `1 ${fromCurrency} = ${conversionRate.toFixed(4)} ${toCurrency}`;
            } else {
                throw new Error('Conversion failed');
            }
        } catch (error) {
            resultDiv.textContent = 'Conversion Error';
            rateInfoDiv.textContent = 'Unable to pull current rates';
            console.error('Conversion Error:', error);
        }
    }

    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
        convertCurrency();
    }


    convertBtn.addEventListener('click', convertCurrency);


    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            swapCurrencies();
        }
    });


    populateCurrencies();
    convertCurrency();
});
