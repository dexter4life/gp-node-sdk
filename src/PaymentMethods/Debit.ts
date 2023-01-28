import {
  AuthorizationBuilder,
  EncryptionData,
  FundingType,
  ICard,
  PaymentMethodType,
  TransactionType,
} from "../";
import { Card } from "./Card";

export abstract class Debit extends Card implements ICard {
  public encryptionData: EncryptionData;
  public paymentMethodType: PaymentMethodType = PaymentMethodType.Debit;
  public pinBlock: string;
  public funding: FundingType;
  public storageModel: "ALWAYS" | "ON_SUCCESS";

  constructor() {
    super();
    this.funding = "DEBIT";
  }

  /**
   * Authorizes the payment method and captures the entire authorized amount
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public charge(amount?: string) {
    return new AuthorizationBuilder(TransactionType.Sale, this).withAmount(
      amount,
    );
  }

  /**
   * Adds value to the payment method
   *
   * @param string|number amount Amount to add
   *
   * @return AuthorizationBuilder
   */
  public addValue(amount?: string) {
    return new AuthorizationBuilder(TransactionType.AddValue, this).withAmount(
      amount,
    );
  }

  /**
   * Refunds the payment method
   *
   * @param string|number amount Amount to refund
   *
   * @return AuthorizationBuilder
   */
  public refund(amount?: string) {
    return new AuthorizationBuilder(TransactionType.Refund, this).withAmount(
      amount,
    );
  }

  /**
   * Reverses the payment method
   *
   * @param string|number amount Amount to reverse
   *
   * @return AuthorizationBuilder
   */
  public reverse(amount?: string) {
    return new AuthorizationBuilder(TransactionType.Reversal, this).withAmount(
      amount,
    );
  }
}
