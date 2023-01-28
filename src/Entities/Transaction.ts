import { BasePaymentMethod } from "src/PaymentMethods";
import { Device } from "src/PaymentMethods/Device";

import {
  TransactionReportBuilder,
  CaptureSequenceType,
  IAction,
  ITransaction,
  Lodging,
  PaymentMethod,
  TransactionQuery,
  TransactionType,
} from "..";

export class Transaction extends BasePaymentMethod implements ITransaction {
  [x: string]: any;
  public id: string;
  public timeCreated: string;
  public type: string;
  public status: string;
  public channel: string;
  public captureMode: string;
  public amount: number | string;
  public currency: string;
  public country: string;
  public merchantId: string;
  public merchantName: string;
  public accountId: string;
  public accountName: string;
  public reference: string;
  public batchId: string;
  public currencyConversion: any;
  public action: IAction;
  public paymentMethod: PaymentMethod;
  public lodging: Lodging;
  public totalCaptureCount: number;
  public captureSequence: CaptureSequenceType;
  public device: Device;
  public gratuityAmount: string | number;
  authorizationMode: "PARTIAL" | undefined;

  constructor(id?: string) {
    super();

    if (id != undefined) this.id = id;
  }

  /**
   * Adjust an existing Customer Present (CP)transaction. Use this action to change data about a
   *  transaction before it is batched. This action does not change the status of a
   * transaction, only the data it contains.
   * @param amount
   * @returns TransactionReportBuilder
   */
  public adjustment(amount: string) {
    return new TransactionReportBuilder(TransactionType.Edit, this).withAmount(
      amount,
    );
  }

  /**
   *  Create a Refund transaction from a previous Sale. The payment method associated
   *  with the original Sale is used to refund the Payer.
   * @param (number | string) amount
   * @returns TransactionReportBuilder
   */
  public refund(amount?: string) {
    return new TransactionReportBuilder(
      TransactionType.Refund,
      this,
    ).withAmount(amount);
  }

  /**
   *
   * Capture a Sale transaction that has a status of PREAUTHORIZED to receive funds for that transaction.
   * The transaction can be captured for a different amount than what was authroized.
   * Also it can be captured in multiple segments to facilitate split shipment.
   *  (Availability of multiple captures in production depends on your live configuration.)
   *
   * @param amount
   * @returns TransactionReportBuilder
   */
  public capture(amount?: string) {
    if (amount !== undefined)
      return new TransactionReportBuilder(
        TransactionType.Capture,
        this,
      ).withAmount(amount);
    return new TransactionReportBuilder(TransactionType.Capture, this);
  }

  /**
   *  Cancel a transaction before it has been sent for funding. transactions can be reversed in
   *  full or partially reversed. An attempt to restore Payer's spending limit is always made.
   * If no amount is included in the request body, the full value of the transaction will be
   * reversed. In timeout scenarios, the reference field can be used in place of the id in the
   * URL to execute a reversal also. (Availability of partial reversals depends on your live
   * configuration.)
   *
   * @param amount number/string
   * @returns TransactionReportBuilder
   */
  public reverse(amount?: string) {
    return new TransactionReportBuilder(
      TransactionType.Reversal,
      this,
    ).withAmount(amount);
  }

  /**
   *  Get a single view of a transaction using the Global Payments transaction id.
   * @returns  Promise<Transaction>
   */
  public detail(): Promise<Transaction> {
    return new TransactionReportBuilder(TransactionType.Fetch, this).execute();
  }

  /**
   *Get a list of transactions recently processed, using criteria passedin the query string. 
   Page through the result set to access all records.

   * @param query TransactionQuery
   *  @returns TransactionReportBuilder
   */
  public details(query: TransactionQuery): Promise<Transaction> {
    return new TransactionReportBuilder(
      TransactionType.Fetch,
      Object.assign(this, { query }),
    ).execute();
  }

  /**
   *  Increment the amount for an existing transaction. Use this action to add a charge
   *  to an existing transaction before it is batched. This action does not change the
   * status of a transaction, if successful it increases the amount of the existing
   * transaction. (Availability in production depends on your live configuration.)
   *
   * @param amount
   * @returns TransactionReportBuilder
   */
  public increment(amount: string) {
    return new TransactionReportBuilder(
      TransactionType.AddValue,
      this,
    ).withAmount(amount);
  }

  /**
   * This action be to used to refresh the authorization associated with a transaction
   * to get a more recent authcode or reauthorize a transaction reversed in error.
   * (Availability in production depends on your live configuration.)
   *
   * @param amount
   * @returns TransactionReportBuilder
   */
  public reAuth(amount: string) {
    return new TransactionReportBuilder(
      TransactionType.ReAuth,
      this,
    ).withAmount(amount);
  }

  public confirm() {
    return new TransactionReportBuilder(TransactionType.Confirm, this);
  }

  public describe() {
    return new TransactionReportBuilder(TransactionType.Describe, this);
  }
  /**
   *Transfer part of a transaction amount, executed by a merchant, to the partner account.
   * @param amount
   * @returns TransactionReportBuilder
   */
  public split(amount: string) {
    return new TransactionReportBuilder(
      TransactionType.Split,
      this,
    ).withPartnerAmount(amount);
  }

  resubmit() {
    return new TransactionReportBuilder(TransactionType.Resubmit, this);
  }
}
