import { PaymentMethodType, Transaction } from "src/Entities";
import { BasePaymentMethod } from "src/PaymentMethods";
import { ServicesContainer } from "src/ServicesContainer";
import { TransactionBuilder } from "./TransactionBuilder";

export class DigitalWalletBuilder extends TransactionBuilder<Transaction> {
  public constructor(type: number, paymentMethod?: BasePaymentMethod) {
    const {
      paymentMethodType,
      paymentOption,
      ...others
    } = paymentMethod as BasePaymentMethod;
    if (paymentMethod) {
      switch (paymentMethodType) {
        case PaymentMethodType.APM:
          super(type, ({
            apm: others,
            ...paymentOption,
          } as unknown) as BasePaymentMethod);
          break;
        case PaymentMethodType.DigitalWallet:
          super(type, ({
            digitalWallet: others,
            ...paymentOption,
          } as unknown) as BasePaymentMethod);
          break;
      }
    }
  }

  /**
   * Executes the authorization builder against the gateway.
   *
   * @returns Promise<Transaction>
   */
  public async execute(): Promise<Transaction> {
    const gateway = await ServicesContainer.instance()
      .getClient()
      .getAuthorizationHeader();

    return await gateway.processWalletAuthorization(this);
  }
}
