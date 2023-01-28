import { IPaymentMethodResult } from "src/Interface/IPaymentMethodResult";
import { PaymentMethod, ServicesContainer, TransactionType } from "../";
import { AuthorizationBuilder } from "./AuthorizationBuilder";

export class PaymentMethodDetailBuilder extends AuthorizationBuilder<
  PaymentMethod | IPaymentMethodResult
> {
  public paymentMethod: PaymentMethod;
  public query?: Record<string, any>;

  constructor(
    type: TransactionType,
    paymentMethod?: PaymentMethod,
    query?: Record<string, any>,
  ) {
    super(type);
    // this.type = type;
    if (paymentMethod !== undefined) this.paymentMethod = paymentMethod;
    if (query !== undefined) this.query = query;
  }

  /**
   * Executes the authorization builder against the gateway.
   *
   * @returns Promise<Transaction>
   */
  public async execute(): Promise<PaymentMethod | IPaymentMethodResult> {
    const gateway = await ServicesContainer.instance()
      .getClient()
      .getAuthorizationHeader();

    return await gateway.handlePaymentInfo(this);
  }
}
