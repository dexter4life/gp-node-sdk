For globalpayments and those who use to integrate it into their system.


#### Process a Payment Example

```javascript
const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.version = "2021-03-22";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";

  ServicesContainer.configure(config);

  const card = new CreditCardData();
  card.number = "4111111111111111";
  card.expiryMonth = "04";
  card.expiryYear = "25";
  card.cvv = "123";
  card.avsAddress = "RD.asd'-' 17's Bogong";
  card.avsPostalCode = "3699";

  const transaction = await card
    .authorize("140")
    .withAccountName("Transaction_Processing")
    .withCapture({ mode: "AUTO" })
    .withCountry("US")
    .withChannel("CNP")
    .withReference("2030404003")
    .withCurrency("USD")
    .execute();

  console.log(transaction);
```

##### Tokenization example

```javascript 
     const config = new ServicesConfig();
  config.appKey = "QVefNGo6bkMcjveA";
  config.serviceUrl = "https://apis.sandbox.globalpay.com/ucp";
  config.applicationId = "i9R0byBBor6RqTQNj3g4MuVBwH5rd7yR";

  ServicesContainer.configure(config);

  const card = new CreditCardData();
  card.number = "4111111111111111";
  card.expiryMonth = "04";
  card.expiryYear = "25";

  const paymentMethod = (await card
    .tokenize()
    .withRequestMultiUseToken(true)
    .withAccountName("Tokenization")
    .withReference("2030404003")
    .execute()) as PaymentMethod;

  paymentMethod.delete().then((detail) => {
    console.log(detail);
  });
```
