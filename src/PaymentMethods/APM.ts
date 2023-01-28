import { PaymentMethodType, APMType } from "../";
import { DigitalWalletBase } from "./DigitalWalletBase";

export class APM extends DigitalWalletBase<APMType> {
  public provider: APMType;
  public providerPayerReference: string;

  constructor(provider: APMType = "PAYPAL") {
    super(provider);
    this.paymentMethodType = PaymentMethodType.APM;
  }
}
