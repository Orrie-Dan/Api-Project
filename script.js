document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        amount: document.getElementById('amount'),
        fromCurrency: document.getElementById('fromCurrency'),
        toCurrency: document.getElementById('toCurrency'),
        convertBtn: document.getElementById('convertBtn'),
        result: document.getElementById('result'),
        rateInfo: document.getElementById('rateInfo')
    };
  const CURRENCIES = [
        { code: 'USD', name: 'US Dollar' },
        { code: 'EUR', name: 'Euro' },
        { code: 'GBP', name: 'British Pound' },
        { code: 'JPY', name: 'Japanese Yen' },
        { code: 'CAD', name: 'Canadian Dollar' },
        { code: 'AUD', name: 'Australian Dollar' },
        { code: 'CHF', name: 'Swiss Franc' },
        { code: 'CNY', name: 'Chinese Yuan' },
        { code: 'INR', name: 'Indian Rupee' },
        { code: 'BRL', name: 'Brazilian Real' }
    ];
    const populateCurrencies = () => {
        CURRENCIES.forEach(({code, name}) => {
            [elements.fromCurrency, elements.toCurrency].forEach(select => {
                const option = new Option(`${code} - ${name}`, code);
                select.add(option);
            });
        });

        elements.fromCurrency.value = 'USD';
        elements.toCurrency.value = 'EUR';
    };

   const convertCurrency = async () => {
        const amount = parseFloat(elements.amount.value);
        const fromCurrency = elements.fromCurrency.value;
        const toCurrency = elements.toCurrency.value;

        if (!amount || amount <= 0) {
            elements.result.textContent = 'Please enter a valid amount';
            return;
        }

        try {
            const API_KEY = '6b77c97127a28e6babece4ac';
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`);
            const data = await response.json();

            if (data.result === 'success') {
                const conversionRate = data.conversion_rates[toCurrency];
                const convertedAmount = (amount * conversionRate).toFixed(2);

                elements.result.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
                elements.rateInfo.textContent = `1 ${fromCurrency} = ${conversionRate.toFixed(4)} ${toCurrency}`;
            } else {
                throw new Error('Conversion failed');
            }
        } catch (error) {
            elements.result.textContent = 'Conversion Error';
            elements.rateInfo.textContent = 'Unable to pull current rates';
            console.error('Conversion Error:', error);
        }
    };

    const swapCurrencies = () => {
        [elements.fromCurrency.value, elements.toCurrency.value] =
            [elements.toCurrency.value, elements.fromCurrency.value];
        convertCurrency();
    };

    elements.convertBtn.addEventListener('click', convertCurrency);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            swapCurrencies();
        }
    });
    populateCurrencies();
    convertCurrency();
});
