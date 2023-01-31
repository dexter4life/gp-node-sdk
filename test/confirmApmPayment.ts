import { ServicesConfig, ServicesContainer, Transaction } from "../src";

async function confirmApmPayment() {
  const config = new ServicesConfig();
  config.appKey = "";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "";
  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const id = "TRN_XPDuoVBUhfvKYA6EEhznYbOgqpFXpY_23280731";
  const _transaction = new Transaction(id);
  _transaction
    .confirm()
    .withAPM({ provider: "PAYPAL", providerPayerReference: "23280731" })
    .execute()
    .then((response) => console.log(response))
    .catch((reason) => console.log(reason));
}
