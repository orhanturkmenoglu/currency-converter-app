const apiKey = "3a6d924dd0176b8f122cbadc";
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

const fromDropDown = document.querySelector("#from-currency-select");
const toDropDown = document.querySelector("#to-currency-select");
const result = document.querySelector("#result");
const errorMessageDiv = document.querySelector("#error-message");

const currencyCodes = [
  "AED",
  "AFN",
  "ALL",
  "AMD",
  "ANG",
  "AOA",
  "ARS",
  "AUD",
  "AWG",
  "AZN",
  "BAM",
  "BBD",
  "BDT",
  "BGN",
  "BHD",
  "BIF",
  "BMD",
  "BND",
  "BOB",
  "BRL",
  "BSD",
  "BTN",
  "BWP",
  "BYN",
  "BZD",
  "CAD",
  "CDF",
  "CHF",
  "CLP",
  "CNY",
  "COP",
  "CRC",
  "CUP",
  "CVE",
  "CZK",
  "DJF",
  "DKK",
  "DOP",
  "DZD",
  "EGP",
  "ERN",
  "ETB",
  "EUR",
  "FJD",
  "FKP",
  "FOK",
  "GBP",
  "GEL",
  "GGP",
  "GHS",
  "GIP",
  "GMD",
  "GNF",
  "GTQ",
  "GYD",
  "HKD",
  "HNL",
  "HRK",
  "HTG",
  "HUF",
  "IDR",
  "ILS",
  "IMP",
  "INR",
  "IQD",
  "IRR",
  "ISK",
  "JEP",
  "JMD",
  "JOD",
  "JPY",
  "KES",
  "KGS",
  "KHR",
  "KID",
  "KMF",
  "KRW",
  "KWD",
  "KYD",
  "KZT",
  "LAK",
  "LBP",
  "LKR",
  "LRD",
  "LSL",
  "LYD",
  "MAD",
  "MDL",
  "MGA",
  "MKD",
  "MMK",
  "MNT",
  "MOP",
  "MRU",
  "MUR",
  "MVR",
  "MWK",
  "MXN",
  "MYR",
  "MZN",
  "NAD",
  "NGN",
  "NIO",
  "NOK",
  "NPR",
  "NZD",
  "OMR",
  "PAB",
  "PEN",
  "PGK",
  "PHP",
  "PKR",
  "PLN",
  "PYG",
  "QAR",
  "RON",
  "RSD",
  "RUB",
  "RWF",
  "SAR",
  "SBD",
  "SCR",
  "SDG",
  "SEK",
  "SGD",
  "SHP",
  "SLE",
  "SLL",
  "SOS",
  "SRD",
  "SSP",
  "STN",
  "SYP",
  "SZL",
  "THB",
  "TJS",
  "TMT",
  "TND",
  "TOP",
  "TRY",
  "TTD",
  "TVD",
  "TWD",
  "TZS",
  "UAH",
  "UGX",
  "USD",
  "UYU",
  "UZS",
  "VES",
  "VND",
  "VUV",
  "WST",
  "XAF",
  "XCD",
  "XDR",
  "XOF",
  "XPF",
  "YER",
  "ZAR",
  "ZMW",
  "ZWL",
];

// Populate the dropdowns with currency codes
const populateCurrencyDropdown = (dropdown) => {
  currencyCodes.forEach((currency) => {
    const option = document.createElement("option");
    option.value = currency;
    option.textContent = currency;
    dropdown.appendChild(option);
  });
};

populateCurrencyDropdown(fromDropDown);
populateCurrencyDropdown(toDropDown);

fromDropDown.value = "TRY";
toDropDown.value = "USD";

// Display error messages
const showErrorMessage = (message) => {
  errorMessageDiv.textContent = message;
  errorMessageDiv.style.display = "block";
};

const hideErrorMessage = () => {
  errorMessageDiv.style.display = "none";
};

// Convert currency based on user input
const convertCurrency = () => {
  const amount = document.querySelector("#amount").value.trim();
  const fromCurrency = fromDropDown.value;
  const toCurrency = toDropDown.value;

  if (amount) {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        hideErrorMessage();
        const fromExchangeRate = data.conversion_rates[fromCurrency];
        const toExchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount / fromExchangeRate) * toExchangeRate;

        result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount.toFixed(
          2
        )} ${toCurrency}`;
      })
      .catch((error) => {
        showErrorMessage(
          "An error occurred while fetching the data. Please try again."
        );
        console.error(error);
      });
  } else {
    showErrorMessage("Please enter a valid amount!");
    result.innerHTML = "";
  }
};

document
  .querySelector("#convert-button")
  .addEventListener("click", convertCurrency);
window.addEventListener("load", convertCurrency);
