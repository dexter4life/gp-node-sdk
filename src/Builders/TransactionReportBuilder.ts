import { Transaction, TransactionType } from "src/Entities";
import { BankTransfer, Lodging } from "src/PaymentMethods";
import { Card } from "src/PaymentMethods/Card";
import { ServicesContainer } from "src/ServicesContainer";
import { TransactionBuilder } from "./TransactionBuilder";

export class TransactionReportBuilder extends TransactionBuilder<Transaction> {
  public transactionReport: Transaction;

  constructor(type: TransactionType, transaction: Transaction) {
    super(type);
    if (transaction) {
      this.transactionReport = transaction;
    }
  }

  /**
   * Executes the authorization builder against the gateway.
   * @returns Promise<Transaction>
   */
  public async execute(): Promise<Transaction> {
    super.execute();

    const gateway = await ServicesContainer.instance()
      .getClient()
      .getAuthorizationHeader();

    return gateway.processTransaction(this);
  }

  /**
   *
   *
   * @param {number} amount The amount
   * @returns {TransactionReportBuilder}
   */
  public withAmount(amount?: string) {
    if (amount !== undefined) {
      this.amount = amount;
    }
    return this;
  }

  public withLodging(lodging: Lodging): this {
    if (lodging !== undefined) {
      this.lodging = lodging;
    }
    return this;
  }

  /**
   *
   *
   * @param {number} amount The amount
   * @returns {TransactionReportBuilder}
   */

  public withGratuityAmount(amount: string | number) {
    if (amount !== undefined) {
      this.gratuityAmount = amount;
    }
    return this;
  }
  /**
   *
   *
   * @param {CreditCardData} card
   * @returns {TransactionReportBuilder}
   */
  public withCardData(card: Card) {
    if (card !== undefined) {
      const { paymentMethodType, paymentOption, ...others } = card;
      this.paymentMethod = Object.assign(this.paymentMethod ?? {}, {
        paymentMethodType,
        ...paymentOption,
        card: others,
      });
    }
    return this;
  }

  /**
   *
   * @param {CreditCardData} card
   * @returns {TransactionReportBuilder}
   */
  public withBankTransferDetail(bankTransfer: BankTransfer) {
    if (bankTransfer !== undefined) {
      const { paymentMethodType, paymentOption, ...others } = bankTransfer;
      this.paymentMethod = Object.assign(this.paymentMethod ?? {}, {
        paymentMethodType,
        bankTransfer: others,
        ...paymentOption,
      });
    }
    return this;
  }
}
