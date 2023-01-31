import {
  ServicesConfig,
  ServicesContainer,
  PhysicalCard,
  EntryMode,
} from "../src";

async function swipePayment() {
  const config = new ServicesConfig();
  config.appKey = "";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "";

  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const card = new PhysicalCard();
  card.track =
    "%B4012002000060016^VI TEST CREDIT^251210118039000000000396?;4012002000060016=25121011803939600000?";
  card.number = "";
  card.paymentOption.firstName = "Jane";
  card.paymentOption.lastName = "Doe";
  card.paymentOption.entryMode = EntryMode.SWIPE;

  const response = await card
    .charge("10000")
    .withAccountName("Transaction_Processing")
    .withCapture({ mode: "AUTO" })
    .withCountry("US")
    .withChannel("CP")
    .withReference("2030404003")
    .withCurrency("USD")
    .execute();
  return response;
}
