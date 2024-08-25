const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;
const JPY = 0.033;
const ARS = 0.017;
const CNY = 0.67;

const form = document.querySelector("form");
const value = document.getElementById("value");
const currency = document.getElementById("currency");

value.addEventListener("input", () => {
    const regex = /\D+/g;
    value.value = value.value.replace(regex, "");
    console.log(value.value);
});

form.onsubmit = (event) => {
    event.preventDefault();
    console.log(currency.value);

    switch (currency.value) {
        case "USD":
            convertCurrency(Number(value.value), USD, "US$");
            break;
        case "EUR":
            convertCurrency(Number(value.value), EUR, "€");
            break;
        case "GBP":
            convertCurrency(Number(value.value), GBP, "£");
            break;
        case "JPY":
            convertCurrency(Number(value.value), JPY, "¥");
            break;
        case "ARS":
            convertCurrency(Number(value.value), ARS, "$");
            break;
        case "CNY":
            convertCurrency(Number(value.value), CNY, "¥");
            break;
        default:
            console.log("Selecione uma moeda válida.");
            break;
    }
};

function convertCurrency(value, price, symbol) {
    const convertedValue = value * price;
    console.log(`Valor convertido: ${symbol}${convertedValue.toFixed(2)}`);


    document.getElementById("description").innerText = `${symbol} 1 = ${formatCurrencyBRL(price)}`;

    document.getElementById("result").innerText = `${symbol} ${value} = ${formatCurrencyBRL(convertedValue.toFixed(2))}`;
}

function formatCurrencyBRL(value) {
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}
