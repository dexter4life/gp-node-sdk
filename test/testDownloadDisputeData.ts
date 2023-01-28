import { DisputeManagement } from "src/Entities/DisputesManagement";
import { ServicesConfig, ServicesContainer } from "../src";

async function testDownloadDisputeData() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";
  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const dispute = new DisputeManagement("DIS_SAND_abcd1234");
  dispute
    .downloadDoc("DOC_MyEvidence_234234AVCDE-1")
    .execute()
    .then((response) => console.log(response));
}
