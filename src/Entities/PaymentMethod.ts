import { PaymentMethodDetailBuilder } from "src/Builders/PaymentDetailBuilder";
import { APM, BasePaymentMethod, CreditCardData } from "src/PaymentMethods";
import { Card } from "src/PaymentMethods/Card";
import {
  CaptureMode,
  EntryMode,
  TransactionChannel,
  TransactionType,
} from "..";

interface LodgingChargeItem {
  types: string[];
  reference: string;
  totalAmount: string;
  paymentMethodProgramCodes: string[];
}

export interface Lodging {
  bookingReference: string;
  durationDays: string;
  dateCheckedIn: string;
  dateCheckedOut: string;
  dailyRateAmount: string;
  "lodging.chargeItems": LodgingChargeItem[];
}

export type APMType = "TESTPAY" | "PAYPAL" | "SOFORT" | "IDEAL" | "GIROPAY";

export type WalletProvider = "APPLEPAY" | "PAY_BY_GOOGLE";

export interface IAlternativePayment<Provider> {
  provider: Provider;
  providerPayerReference: string;
  name: string;
}

export type PaymentMethodActionType =
  | "ALL_PAYMENT_DETAIL"
  | "SINGLE_DETAIL"
  | "TOKENIZE"
  | "DETOKENIZE"
  | "EDIT"
  | "DELETE";

export type EncryptionMethodType = "KTB" | "KSN";

export interface EncryptionMethod {
  method: EncryptionMethodType;
  version: string;
  info: string;
}

export interface IPaymentMethod {
  entryMode?: EntryMode | undefined;
  name: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  id: string;
  narration: string;
  captureMode: CaptureMode;
  storageMode: "ALWAYS" | "ON_SUCCESS";
  fingerPrintMode: "ALWAYS" | "ON_SUCCESS";
  encryption: EncryptionMethod;
  authentication: any;
  channel: TransactionChannel;
  storageModel: "ALWAYS" | "ON_SUCCESS";
  description: string;
}

export class PaymentMethod extends BasePaymentMethod implements IPaymentMethod {
  [x: string]: {};
  public id: string;
  public narration: string;
  public captureMode: CaptureMode;
  public storageMode: "ALWAYS" | "ON_SUCCESS";
  public fingerPrintMode: "ALWAYS" | "ON_SUCCESS";
  public encryption: EncryptionMethod;
  public authentication: string;
  public channel: TransactionChannel;
  public storageModel: "ALWAYS" | "ON_SUCCESS";
  public card: Card;
  public description: string;
  public apm: APM;

  constructor(id?: string) {
    super();
    if (id !== undefined) this.id = id;
  }

  public static getAllPaymentDetails(query?: Record<string, any>) {
    return new PaymentMethodDetailBuilder(
      TransactionType.AllPaymentDetail,
      new PaymentMethod(),
      query,
    );
  }

  public getPaymentDetail() {
    return new PaymentMethodDetailBuilder(
      TransactionType.SinglePaymentDetail,
      this,
    );
  }

  /**
   * Tokenizes the payment method
   *
   * @return AuthorizationBuilder
   */
  public tokenize() {
    return new PaymentMethodDetailBuilder(TransactionType.Tokenize, this);
  }

  public detokenize() {
    return new PaymentMethodDetailBuilder(
      TransactionType.Detokenize,
      (this as unknown) as PaymentMethod,
    );
  }

  public edit(card: Partial<CreditCardData>) {
    return new PaymentMethodDetailBuilder(
      TransactionType.Edit,
      (Object.assign(this, { card }) as unknown) as PaymentMethod,
    );
  }

  public delete() {
    return new PaymentMethodDetailBuilder(
      TransactionType.Delete,
      (this as unknown) as PaymentMethod,
    ).execute();
  }
}
