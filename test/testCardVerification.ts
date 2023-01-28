import {
  ServicesConfig,
  ServicesContainer,
  EBTCardData,
  EntryMode,
  Transaction,
  CvvIndicator,
} from "../src";

async function testCardVerification() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.version = "2021-03-22";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";

  ServicesContainer.configure(config);

  const cardData = new EBTCardData();
  cardData.firstName = "Jane";
  cardData.lastName = "Doe";
  cardData.entryMode = EntryMode.ECOM;
  cardData.number = "4242424242424242";
  cardData.expiryMonth = "12";
  cardData.expiryYear = "25";
  cardData.cvv = "123";
  cardData.avsAddress = "16 Summerfield Court";
  cardData.avsPostalCode = "12345";
  cardData.cvvIndicator = CvvIndicator.Present;
  cardData.funding = undefined;

  cardData
    .verify()
    .withAccountName("Transaction_Processing")
    .withChannel("CNP")
    .withCurrency("USD")
    .withCountry("US")
    .withReference("My Own Reference")
    .execute()
    .then((response: Transaction) => {
      console.log(response);
    });
}
