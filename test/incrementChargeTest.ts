import { ServicesConfig, ServicesContainer, Transaction } from "../src";

async function incrementChargeTest() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.version = "2021-03-22";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";

  ServicesContainer.configure(config);

  const id = "TRN_uzFr7t4VOqxdLDI44hHmXIjHtOOE8d";
  const _transaction = new Transaction(id);
  _transaction
    .increment("2000")
    .withLodging({
      bookingReference: "Hello world",
      durationDays: "10",
      dailyRateAmount: "13490",
      dateCheckedIn: "2021-02-11",
      dateCheckedOut: "2022-02-11",
      "lodging.charge_items": [
        {
          type: "NO_SHOW",
          reference: "Some example",
          totalAmount: "13490",
          paymentMethodProgramCodes: "ASSURED_RESERVATION",
        },
      ],
    })
    .execute()
    .then((response) => console.log(response))
    .catch((reason) => console.log(reason));
}
