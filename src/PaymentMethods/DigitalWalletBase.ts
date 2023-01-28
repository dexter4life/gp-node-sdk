import { DigitalWalletBuilder, TransactionType, IAlternativePayment } from "..";
import { BasePaymentMethod } from "./BasePaymentMethod";

export class DigitalWalletBase<Provider> extends BasePaymentMethod
  implements IAlternativePayment<Provider> {
  provider: Provider;
  providerPayerReference: string;

  set name(name: string) {
    this.paymentOption.name = name;
  }

  constructor(provider?: Provider) {
    super();
    //use paypal if nothing is provided
    if (provider !== undefined) {
      this.provider = provider;
    }
  }

  /**
   * @param amount
   * @returns {DigitalWalletBase<Provider>}
   */
  public initiate(amount: string) {
    return new DigitalWalletBuilder(TransactionType.Sale, this).withAmount(
      amount,
    );
  }
}
