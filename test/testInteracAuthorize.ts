import { Device } from "src/PaymentMethods/Device";
import {
  ServicesConfig,
  ServicesContainer,
  EntryMode,
  Transaction,
  PhysicalCard,
} from "../src";

// TRA_10.1 Interac Authorize
async function testInteracAuthorize() {
  const config = new ServicesConfig();
  config.appKey = "";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "";
  config.version = "2021-03-22";

  ServicesContainer.configure(config);

  const cardData = new PhysicalCard();
  cardData.entryMode = EntryMode.CHIP;
  cardData.funding = "DEBIT";
  cardData.tag =
    "82021C008407A0000002771010950580000080009A031907319B0268009C01005F280201245F2A0201245F3401019F02060000000010009F03060000000000009F0607A00000027710109F080200019F090200019F100706010A03A4A8009F1A0201249F21031558109F2608395F21408D87BAB09F2701809F3303E0F8C89F34030100029F3501229F360200609F37048C8C7AC59F3901059F410400000025";
  cardData.track = ";4506445006931933=22122200162907400000?";
  cardData.set("authentication", { mac: "A01B82D800000000" });

  const device = new Device();
  device.time = "2019-10-14T05:58:40";
  device.sequenceNumber = "000010010500";

  cardData
    .authorize("1000")
    .withDevice(device)
    .withAccountName("Transaction_Processing")
    .withChannel("CP")
    .withCountry("CA")
    .withCurrency("CAD")
    .withReference("11223344")
    .execute()
    .then((response: Transaction) => {
      console.log(response);
    });
}
