const USD = 4.87;
const EUR = 5.32;
const GBP = 6.08;
const JPY = 0.033;
const ARS = 0.017;
const CNY = 0.67;

const form = document.querySelector("form");
const value = document.getElementById("value");
const currency = document.getElementById("currency");
const footer = document.querySelector("footer");

function menssageValid() {
    document.getElementById("menssage").innerHTML = "";
}

value.addEventListener("input", () => {
        const regex = /\D+/g;
        value.value = value.value.replace(regex, "");
        console.log(value.value);    
});

form.onsubmit = (event) => {
    event.preventDefault()

        switch (currency.value) {
            case "USD":
                convertCurrency(Number(value.value), USD, "US$");
                menssageValid()
                break;
            case "EUR":
                convertCurrency(Number(value.value), EUR, "€");
                menssageValid()
                break;
            case "GBP":
                convertCurrency(Number(value.value), GBP, "£");
                menssageValid()
                break;
            case "JPY":
                convertCurrency(Number(value.value), JPY, "¥");
                menssageValid()
                break;
            case "ARS":
                convertCurrency(Number(value.value), ARS, "$");
                menssageValid()
                break;
            case "CNY":
                convertCurrency(Number(value.value), CNY, "¥");
                menssageValid()
                break;
            default:
                document.getElementById("menssage").innerHTML = "Selecione uma moeda valida";
                break;
    }
};

function convertCurrency(value, price, symbol) {
    try {
        let convertedValue = value * price;
        convertedValue = formatCurrencyBRL(convertedValue).replace("R$", "");
        console.log(`Valor convertido: ${symbol}${convertedValue}`);

        document.getElementById("description").innerText = `${symbol} 1 = ${formatCurrencyBRL(price)}`;
        document.getElementById("result").innerText = `${convertedValue} Reais`;

        footer.classList.add("on");
    } catch (error) {
        console.error("Erro ao converter a moeda:", error);
    }
}

function formatCurrencyBRL(value) {

        return Number(value).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });    
}
