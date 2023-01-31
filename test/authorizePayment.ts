import { CreditCardData, ServicesConfig, ServicesContainer } from "../src";

// Card Data
async function authorizePayment() {
  const config = new ServicesConfig();
  config.appKey = "";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "";
  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const card = new CreditCardData();
  card.number = "4111111111111111";
  card.expiryMonth = "04";
  card.expiryYear = "25";
  card.cvv = "123";
  card.avsAddress = "RD.asd'-' 17's Bogong";
  card.avsPostalCode = "3699";

  const transaction = await card
    .authorize("140")
    .withAccountName("Transaction_Processing")
    .withCapture({ mode: "AUTO" })
    .withCountry("US")
    .withChannel("CNP")
    .withReference("2030404003")
    .withCurrency("USD")
    .execute();

  console.log(transaction);
}
