import { ServicesConfig, ServicesContainer, Transaction } from "../src";

async function getTransactions() {
  const config = new ServicesConfig();
  config.appKey = "";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "";

  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const id = "TRN_RsUTR6k9sYEjs3EeywyiUEiz7X9vaL_18672111";
  const _transaction = new Transaction(id);
  _transaction
    .details({
      order: "DESC",
      pageSize: 20,
      reference: "2030404003",
      fromTimeCreated: "2021-05-28",
    })
    .then((response) => console.log(response))
    .catch((reason) => console.log(reason));
}
