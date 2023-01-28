import { MerchantManagement } from "src/Entities/MerchantManagement";
import { ServicesConfig, ServicesContainer } from "./src";

async function test() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";
  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const merchant = new MerchantManagement();
  merchant
    .boardMerchant()
    .execute()
    .then((response) => console.log(response));
}

test();
