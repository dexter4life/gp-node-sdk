import { ServicesContainer } from "src";
import { Transaction, TransactionType } from "src/Entities";
import { BasePaymentMethod } from "src/PaymentMethods";
import { TransactionBuilder } from "./TransactionBuilder";

export class DeviceSynchronizationBuilder extends TransactionBuilder<
  Transaction
> {
  constructor(type: TransactionType, paymentMethod?: BasePaymentMethod) {
    if (paymentMethod) {
      switch (type) {
        case TransactionType.DeviceSync:
          super(type);
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

    return await gateway.processDeviceSync(this);
  }
}
