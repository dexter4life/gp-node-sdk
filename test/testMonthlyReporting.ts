import { SettlementReport } from "src/Entities/SettlementReport";
import { ServicesConfig, ServicesContainer } from "../src";

async function testMonthlyReporting() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";
  config.version = "2021-03-22";
  config.permissions = [
    "TRA_c9967ad7d8ec4b46b6dd44a61cde9a91",
    "DIA_d4f75884b1e54ae4a5e904155f629f26",
    "DAA_fabf29a777724d83998f6cc4747b7d9a",
    "TKA_b3a46f0f351f43cfad20acf5c32fea50",
  ];

  ServicesContainer.configure(config);

  const report = new SettlementReport();
  report
    .monthlyFees({
      page_size: 1000,
      order: "DESC",
      account_name: "Settlement Reporting",
    })
    .execute()
    .then((response) => console.log(response));
}
