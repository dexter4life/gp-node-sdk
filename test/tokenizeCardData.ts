import {
  ServicesConfig,
  ServicesContainer,
  PaymentMethod,
  CreditCardData,
} from "../src";

async function tokenizeCardData() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";

  ServicesContainer.configure(config);

  const card = new CreditCardData();
  card.number = "4111111111111111";
  card.expiryMonth = "04";
  card.expiryYear = "25";

  const paymentMethod = (await card
    .tokenize()
    .withRequestMultiUseToken(true)
    .withAccountName("Tokenization")
    .withReference("2030404003")
    .execute()) as PaymentMethod;

  paymentMethod.delete().then((detail) => {
    console.log(detail);
  });
}
