import { FundingType, ICard, PaymentMethodType } from "../";
import { Card } from "./Card";

export abstract class EBT extends Card implements ICard {
  public paymentMethodType: PaymentMethodType;
  public funding: FundingType | undefined;
  public storageModel: "ALWAYS" | "ON_SUCCESS";
  public pinBlock: string;

  constructor() {
    super();
    this.funding = "FOOD_STAMP";
    this.paymentMethodType = PaymentMethodType.EBT;
  }
}
