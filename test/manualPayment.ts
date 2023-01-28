import {
  ServicesConfig,
  ServicesContainer,
  PhysicalCard,
  EntryMode,
} from "../src";

async function manualPayment() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.version = "2021-03-22";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";

  ServicesContainer.configure(config);

  const card = new PhysicalCard();
  card.number = "4242424242424242";
  card.expiryMonth = "09";
  card.expiryYear = "25";
  card.paymentOption.firstName = "Jane";
  card.paymentOption.lastName = "Doe";
  card.paymentOption.entryMode = EntryMode.MANUAL;

  const response = await card
    .charge("10000")
    .withAccountName("Transaction_Processing")
    .withCapture({ mode: "AUTO" })
    .withCountry("US")
    .withGratuityAmount("100")
    .withChannel("CP")
    .withReference("2030404003")
    .withCurrency("USD")
    .execute();

  return response;
}
