import { Credit } from "./Credit";

export class CreditCardData extends Credit {
  storageModel: "ALWAYS" | "ON_SUCCESS";
  public static cardTypes = [
    { name: "Visa", regex: /^4/ },
    { name: "MC", regex: /^(5[1-5]|2[2-7])/ },
    { name: "Amex", regex: /^3[47]/ },
    { name: "Diners", regex: /^3[0689]/ },
    { name: "EnRoute", regex: /^2(014|149)/ },
    { name: "Discover", regex: /^6([045]|22)/ },
    { name: "Jcb", regex: /^35/ },
  ];

  constructor() {
    super();
  }

  public getCardType(): string {
    const number = this.number.replace(" ", "").replace("-", "");

    for (const type of CreditCardData.cardTypes) {
      if (type.regex.test(number)) {
        return type.name;
      }
    }

    return "Unknown";
  }
}
