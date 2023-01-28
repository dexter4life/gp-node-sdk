import { DeviceSynchronizationBuilder } from "src/Builders/DeviceSynchronizationBuilder";
import { PaymentMethodDetailBuilder } from "src/Builders/PaymentDetailBuilder";
import {
  AuthorizationBuilder,
  InquiryType,
  PaymentMethod,
  PaymentMethodType,
  TransactionType,
} from "../";
import { BasePaymentMethod } from "./BasePaymentMethod";

export abstract class Card extends BasePaymentMethod {
  constructor(paymentMethodType: PaymentMethodType = PaymentMethodType.Credit) {
    super(paymentMethodType);
  }

  /**
   * Authorizes the payment method
   *
   * @param string|number amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public authorize(amount?: string) {
    return new AuthorizationBuilder(TransactionType.Auth, this)
      .withAmount(amount)
      .withChannel();
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

  public checkRate(amount?: string) {
    return new AuthorizationBuilder(
      TransactionType.CurrencyConversion,
      this,
    ).withAmount(amount);
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
   * Inquires the balance of the payment method
   *
   * @param InquiryType inquiry Type of inquiry
   *
   * @return AuthorizationBuilder
   */
  public balanceInquiry(inquiry?: InquiryType) {
    return new AuthorizationBuilder(
      TransactionType.Balance,
      this,
    ).withBalanceInquiryType(inquiry);
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

  /**
   * Verifications represent the validation of a payment method to ensure it can
   * be used in the creation of a Transaction.
   *
   * @return AuthorizationBuilder
   */
  public verify() {
    return new AuthorizationBuilder(TransactionType.Verify, this);
  }

  /**
   * Tokenizes the payment method
   *
   * @return AuthorizationBuilder
   */
  public tokenize() {
    return new PaymentMethodDetailBuilder(
      TransactionType.Tokenize,
      (this as unknown) as PaymentMethod,
    );
  }

  public detokenize() {
    return new PaymentMethodDetailBuilder(
      TransactionType.Detokenize,
      (this as unknown) as PaymentMethod,
    );
  }

  /**
   * Synchronize a physical device to successfully transaction process.
   * @param device
   * @return DeviceSynchronizationBuilder
   */
  public deviceSync() {
    return new DeviceSynchronizationBuilder(TransactionType.DeviceSync, this);
  }
}
