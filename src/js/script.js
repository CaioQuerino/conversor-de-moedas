


const form = document.querySelector("form");
const value = document.getElementById("value");
const currency = document.getElementById("currency");
const footer = document.querySelector("footer");


const API_URL = 'https://api.exchangerate-api.com/v4/latest/BRL';

let exchangeRates = {};

// Função para obter taxas de câmbio
async function fetchExchangeRates() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        exchangeRates = data.rates;
    } catch (error) {
        document.getElementById("menssage").innerHTML = "Erro ao buscar taxas de câmbio, tente novamente";
        console.error("Erro ao buscar taxas de câmbio:", error);
    } finally {
    // Verifica se as taxas de câmbio foram carregadas
    if (Object.keys(exchangeRates).length === 0) {
        document.getElementById("menssage").innerHTML = "Não foi possível carregar as taxas de câmbio. Tente novamente mais tarde.";
        return;
    }

    }
}

function menssageValid() {
    document.getElementById("menssage").innerHTML = "";
}

value.addEventListener("input", () => {
    const regex = /\D+/g;
    value.value = value.value.replace(regex, "");
    console.log(value.value);    
});

form.onsubmit = (event) => {
    event.preventDefault();

    const selectedCurrency = currency.value;

    if (!exchangeRates[selectedCurrency]) {
        document.getElementById("menssage").innerHTML = "Selecione uma moeda válida";
        return;
    }

    const rate = exchangeRates[selectedCurrency];
    const symbol = getCurrencySymbol(selectedCurrency);
    
    convertCurrency(Number(value.value), rate, symbol);
    menssageValid();
};

// Função para converter a moeda
function convertCurrency(value, rate, symbol) {
    try {
        let convertedValue = value * rate;
        convertedValue = formatCurrencyBRL(convertedValue).replace("R$", "");
        console.log(`Valor convertido: ${symbol}${convertedValue}`);

        document.getElementById("description").innerText = `${symbol} 1 = ${formatCurrencyBRL(rate)}`;
        document.getElementById("result").innerText = `${convertedValue} Reais`;

        footer.classList.add("on");
    } catch (error) {
        console.error("Erro ao converter a moeda:", error);
    }
}

// Função para formatar o valor em reais
function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    });
}

// Função para obter o símbolo da moeda
function getCurrencySymbol(currencyCode) {
    switch (currencyCode) {
        case "USD": return "US$";
        case "EUR": return "€";
        case "GBP": return "£";
        case "JPY": return "¥";
        case "ARS": return "$";
        case "CNY": return "¥";
        default: return "";
    }
}

// Inicializa o carregamento das taxas de câmbio
fetchExchangeRates();
