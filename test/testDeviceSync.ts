import { Device } from "src/PaymentMethods/Device";
import {
  ServicesConfig,
  ServicesContainer,
  Transaction,
  PhysicalCard,
} from "../src";

async function testDeviceSync() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.version = "2021-03-22";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";

  ServicesContainer.configure(config);

  const cardData = new PhysicalCard();

  const device = new Device();
  device.time = "2019-09-23T12:45:58.000Z";

  cardData
    .deviceSync()
    .withDevice(device)
    .withAccountName("Transaction_Processing")
    .withChannel("CP")
    .withCountry("CA")
    .withReference("My Own Reference")
    .execute()
    .then((response: Transaction) => {
      console.log(response);
    });
}
