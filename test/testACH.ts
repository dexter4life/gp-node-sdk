import {
  ServicesConfig,
  ServicesContainer,
  BankTransfer,
  Address,
  Payer,
} from "../src";

async function testACH() {
  const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.version = "2021-03-22";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";

  ServicesContainer.configure(config);

  let address = new Address();
  address.line1 = "12000 Smoketown Rd";
  address.line2 = "Apt 3B";
  address.line3 = "X";
  address.postalCode = "22192";
  address.city = "Mesa";
  address.province = "AZ";
  address.country = "USA";

  const ach = new BankTransfer();
  ach.name = "Jane";
  ach.accountNumber = "1234567890";
  ach.numberType = "SAVINGS";
  ach.checkReference = "124";
  ach.secCode = "WEB";
  ach.merchantNotes = "123";
  ach.bankName = "First Union";
  ach.bankCode = "083908420";
  ach.address = address;

  let billingAddress = new Address();
  billingAddress.line1 = "Address Line 1";
  billingAddress.line2 = "Address Line 2";
  billingAddress.postalCode = "411015";
  billingAddress.city = "PUNE";
  billingAddress.province = "AZ";
  billingAddress.country = "USA";

  const payer = new Payer();
  payer.billingAddress = billingAddress;
  payer.name = "ANGELA SMITH";
  payer.reference = "123";
  payer.landlinePhone = "235555";
  payer.dateOfBirth = "1967-08-13";

  ach
    .authorize("12345")
    .withPayer(payer)
    .withAccountName("Transaction_Processing")
    .withCapture({ mode: "AUTO" })
    .withCountry("US")
    .withChannel("CNP")
    .withReference("2030404003")
    .withCurrency("USD")
    .execute()
    .then((response) => console.log(response))
    .catch((reason) => {
      console.log(reason);
    });
}
