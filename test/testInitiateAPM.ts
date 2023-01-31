import { APM, ServicesConfig, ServicesContainer } from "../src";

async function testInitiateAPM() {
  const config = new ServicesConfig();
  config.appKey = "";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "";
  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const apm = new APM();
  apm.name = "Doe";

  const response = await apm
    .initiate("1000")
    .withCountry("GB")
    .withChannel("CNP")
    .withAccountName("Transaction_Processing")
    .withReference("23280731")
    .withCurrency("EUR")
    .execute()
    .then((response) => console.log(response))
    .catch((reason) => {
      console.log(reason);
    });

  return response;
}
