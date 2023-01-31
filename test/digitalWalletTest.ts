import {
  DigitalWallet,
  ServicesConfig,
  ServicesContainer,
  TokenFormat,
  Transaction,
} from "../src";

async function digitalWalletTest() {
  const config = new ServicesConfig();
  config.appKey = "";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "";

  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const wallet = new DigitalWallet("PAY_BY_GOOGLE");
  wallet.name = "Jane";
  wallet.token = "5167300431085507";
  wallet.tokenFormat = TokenFormat.CardToken;
  wallet.expiryMonth = "12";
  wallet.expiryYear = "25";
  wallet.cryptogram = "234234234";
  wallet.eci = "5";

  await wallet
    .initiate("500")
    .withOrderReference("23280731")
    .withCountry("US")
    .withChannel("CNP")
    .withAccountName("Transaction_Processing")
    .withReference("23280731")
    .withCurrency("USD")
    .execute()
    .then((transaction) => {
      setTimeout(() => {
        const _transaction = new Transaction(transaction.id);
        _transaction.detail().then((result) => console.log(result));
      }, 10000);
    });
}
