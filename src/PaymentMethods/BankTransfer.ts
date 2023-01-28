import { BasePaymentMethod } from "./BasePaymentMethod";
import {
  AuthorizationBuilder,
  TransactionType,
  Address,
  EntryMode,
  PaymentMethodType,
} from "../";

export interface BankData {
  code: string;
  name: string;
  address: Address;
}

type SecCodeType = "CCD" | "POP" | "PPD" | "TEL" | "WEB";

export interface IBankTransfer {
  accountNumber: string;
  numberType: "CHECKING" | "SAVINGS";
  checkReference: string;
  secCode: SecCodeType;
  bank: Partial<BankData>;
  merchantNotes: string;
  entryMode: EntryMode;
  [x: string]: any;
}

export class BankTransfer extends BasePaymentMethod implements IBankTransfer {
  [x: string]: any;
  public accountNumber: string;
  public numberType: "CHECKING" | "SAVINGS";
  public checkReference: string;
  public secCode: SecCodeType;
  public bank: Partial<BankData>;
  public merchantNotes: string;

  constructor(type: PaymentMethodType = PaymentMethodType.ACH) {
    super();

    if (type) {
      this.bank = {};
      this.paymentOption = {};
      this.paymentMethodType = type;
    }
  }

  set bankName(name: string) {
    this.bank.name = name;
  }

  set bankCode(code: string) {
    this.bank.code = code;
  }

  set name(name: string) {
    this.paymentOption.name = name;
  }

  set address(address: Address) {
    this.bank.address = address;
  }

  set entryMode(entry: EntryMode) {
    this.paymentOption.entryMode = entry;
  }

  set description(value: string) {
    this.set("description", value);
  }

  get description() {
    return this.get("description") as string;
  }

  /**
   * Authorizes the payment method
   *
   * @param string amount Amount to authorize
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
   * @param string amount Amount to authorize
   *
   * @return AuthorizationBuilder
   */
  public charge(amount?: string) {
    return new AuthorizationBuilder(TransactionType.Sale, this).withAmount(
      amount,
    );
  }
}
