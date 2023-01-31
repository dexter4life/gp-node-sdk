import {
  ServicesConfig,
  ServicesContainer,
  EBTCardData,
  EntryMode,
} from "../src";

async function refundEbtTransaction() {
  const config = new ServicesConfig();
  config.appKey = "";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "";
  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const ebt = new EBTCardData();
  ebt.name = "Jane Doe";
  ebt.entryMode = EntryMode.MANUAL;
  ebt.pinBlock = "57E7B46D0E374C333D010000144000C2";
  ebt.number = "4003000123456781";
  ebt.expiryMonth = "12";
  ebt.expiryYear = "25";

  ebt
    .charge("154")
    .withAccountName("Transaction_Processing")
    .withChannel("CP")
    .withCurrency("CAD")
    .withCountry("CA")
    .withCapture({ mode: "AUTO" })
    .withReference("2030404003")
    .execute()
    .then((transaction) => {
      setTimeout(() => {
        const cardData = new EBTCardData();
        cardData.firstName = "Jane";
        cardData.lastName = "Doe";
        cardData.entryMode = EntryMode.MANUAL;
        cardData.number = "4242424242424242";
        cardData.expiryMonth = "12";
        cardData.expiryYear = "25";
        cardData.funding = undefined;

        transaction
          .refund("20045")
          .withAccountName("Transaction_Processing")
          .withChannel("CP")
          .withCurrency("CAD")
          .withCountry("CA")
          .withReference("My-Refund-1234345345")
          .withCardData(cardData)
          .execute()
          .then((response) => {
            console.log(response);
          });
      }, 1000);
    });
}
