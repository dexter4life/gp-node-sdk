import {
  AuthorizationBuilder,
  DigitalWalletBuilder,
  IDictionary,
  IPaymentGateway,
  PaymentMethod,
  PaymentMethodType,
  TransactionReportBuilder,
  TransactionType,
} from "../";
import { RestGateway } from "./RestGateway";
import CryptoJS from "crypto-js";
import Redis from "ioredis";
import { IAuthData } from "./IAuthData";
import moment from "moment";
import snakeCase from "snakecase-keys";
import { Transaction } from "src/Entities/Transaction";
import { DeviceSynchronizationBuilder } from "src/Builders/DeviceSynchronizationBuilder";
import { PaymentMethodDetailBuilder } from "src/Builders/PaymentDetailBuilder";
import { IPaymentMethodResult } from "src/Interface/IPaymentMethodResult";
import {
  SettlementReportBuilder,
  ISettlementReport,
} from "src/Builders/SettlementReportBuilder";
import { DisputeManagementBuilder } from "src/Builders/DisputeManagementBuilder";
import { IDisputeReport } from "src/Entities/Dispute";
import { DisputeManagement } from "src/Entities/DisputesManagement";
import {
  AuditTrailBuilder,
  IAuditReport,
} from "src/Builders/AuditTrailBuilder";
import { Audit } from "src/Entities/Audit";
import { MerchantManagementBuilder } from "src/Builders/MerchantManagementBuilder";
import { IMerchantReport } from "src/Entities/Merchant";
import { MerchantManagement } from "src/Entities/MerchantManagement";

export class ProcessTransactions {}

export class GlobalPaymentConnector extends RestGateway
  implements IPaymentGateway {
  public appKey: string;
  public versionNumber: string;
  private nonce: string;
  public applicationId: string;
  public grantType: string;

  async processAuthorization(
    builder: AuthorizationBuilder,
  ): Promise<Transaction> {
    const { transactionType, ...rest } = builder;

    switch (transactionType) {
      case TransactionType.Auth:
      case TransactionType.Sale: {
        return await this.doTransaction<Transaction>(
          "POST",
          "transactions",
          snakeCase(rest),
        ).then(
          (transaction) =>
            Object.assign(new Transaction(), transaction) as Transaction,
        );
      }
      case TransactionType.Verify: {
        return this.doTransaction<Transaction>(
          "POST",
          "verifications",
          snakeCase(rest, {
            deep: true,
          }),
        ).then((transaction) => Object.assign(new Transaction(), transaction));
      }
      case TransactionType.CurrencyConversion: {
        return this.doTransaction<Transaction>(
          "POST",
          "currency-conversions",
          snakeCase(
            { ...rest, transactionType: "SALE" },
            {
              deep: true,
            },
          ),
        ).then((transaction) => Object.assign(new Transaction(), transaction));
      }
    }
    return new Transaction();
  }

  async processSettlementReport(
    builder: SettlementReportBuilder,
  ): Promise<ISettlementReport> {
    const { type, query } = builder;
    switch (type) {
      case "MONTHLY_FEES": {
        return await this.doTransaction<ISettlementReport>(
          "GET",
          "settlement/reports/monthly-fees",
          undefined,
          snakeCase(query as any),
        );
      }
      case "DEPOSITS_REPORT": {
        return await this.doTransaction<ISettlementReport>(
          "GET",
          "settlement/deposits",
          undefined,
          snakeCase(query as any),
        );
      }
      case "DISPUTES_REPORT": {
        return await this.doTransaction<ISettlementReport>(
          "GET",
          "settlement/disputes",
          undefined,
          snakeCase(query as any),
        );
      }
      case "TRANSACTION_REPORT": {
        return await this.doTransaction<ISettlementReport>(
          "GET",
          "settlement/transactions",
          undefined,
          snakeCase(query as any),
        );
      }
    }

    return {};
  }

  async processTransaction(
    builder: TransactionReportBuilder,
  ): Promise<Transaction> {
    const { transactionReport, transactionType, ...rest } = builder;

    if (transactionReport && transactionType) {
      switch (transactionType) {
        case TransactionType.Edit: {
          return await this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/adjustment`,
            snakeCase(rest),
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.Refund: {
          if (rest && rest.paymentMethod) {
            const {
              paymentMethod: { paymentMethodType, ...otherPaymentOptions },
              ...others
            } = rest;

            switch (paymentMethodType) {
              case PaymentMethodType.ACH:
              case PaymentMethodType.EBT:
                return this.doTransaction<Transaction>(
                  "POST",
                  "transactions",
                  snakeCase({
                    ...others,
                    paymentMethod: otherPaymentOptions,
                    type: "REFUND",
                  }),
                ).then((transaction) =>
                  Object.assign(new Transaction(), transaction),
                );
              default:
                break;
            }
          }
          return this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/refund`,
            Object.keys(rest).length > 0 ? snakeCase({ ...rest }) : undefined,
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.Capture: {
          return this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/capture`,
            snakeCase(rest),
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.Reversal: {
          return this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/reversal`,
            Object.keys(rest).length > 0 ? snakeCase({ ...rest }) : undefined,
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.Fetch: {
          if (!transactionReport.query) {
            return this.doTransaction<Transaction>(
              "GET",
              `transactions/${transactionReport.id}`,
            ).then((transaction) =>
              Object.assign(new Transaction(), transaction),
            );
          }
          return this.doTransaction<Transaction>(
            "GET",
            "transactions",
            undefined,
            snakeCase(transactionReport.query),
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.AddValue: {
          return this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/incremental`,
            snakeCase(rest, { exclude: ["lodging.charge_items"], deep: true }),
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.ReAuth: {
          return this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/reauthorization`,
            snakeCase(rest),
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.Confirm: {
          if (
            transactionReport.paymentMethod &&
            transactionReport.paymentMethod.apm !== undefined
          ) {
            const { provider } = transactionReport.paymentMethod.apm;
            const { apm } = rest.paymentMethod;

            return this.doTransaction<Transaction>(
              "POST",
              `transactions/${transactionReport.id}/confirmation`,
              snakeCase(
                Object.assign(rest, {
                  paymentMethod: { apm: { ...apm, provider } },
                }),
                {
                  deep: true,
                },
              ),
            ).then((transaction) =>
              Object.assign(new Transaction(), transaction),
            );
          }

          return this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/confirmation`,
            snakeCase(rest, { deep: true }),
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.Split: {
          return this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/split`,
            snakeCase(rest, { deep: true }),
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.Describe: {
          return this.doTransaction<Transaction>(
            "GET",
            `transactions/${transactionReport.id}/describe`,
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
        case TransactionType.Resubmit: {
          const { paymentMethod, ...others } = rest;
          return this.doTransaction<Transaction>(
            "POST",
            `transactions/${transactionReport.id}/resubmit`,
            snakeCase(Object.assign(paymentMethod ?? {}, others), {
              deep: true,
            }),
          ).then((transaction) =>
            Object.assign(new Transaction(), transaction),
          );
        }
      }
    }

    return new Transaction();
  }

  /**
   *
   * @param builder
   * @returns Promise<Transaction>
   */
  async processDeviceSync(
    builder: DeviceSynchronizationBuilder,
  ): Promise<Transaction> {
    const { transactionType, ...rest } = builder;

    switch (transactionType) {
      case TransactionType.DeviceSync: {
        const transaction = await this.doTransaction<Transaction>(
          "POST",
          "devices",
          snakeCase(rest),
        );
        return Object.assign(new Transaction(), transaction);
      }
    }
    return new Transaction();
  }

  /**
   * processWalletAuthorization - processes the authorization for a given wallet provider
   *
   * async processWalletAuthorization is a function that takes in a DigitalWalletBuilder object and returns a promise of a Transaction object.
   * @param {DigitalWalletBuilder} builder - an object that contains information needed to build a digital wallet
   * @returns {Promise<Transaction>} - a promise of a Transaction
   */
  async processWalletAuthorization(
    builder: DigitalWalletBuilder,
  ): Promise<Transaction> {
    const { transactionType, ...rest } = builder;

    switch (transactionType) {
      case TransactionType.Sale: {
        return this.doTransaction<Transaction>(
          "POST",
          "transactions",
          snakeCase(rest),
        ).then((transaction) => Object.assign(new Transaction(), transaction));
      }
    }
    return new Transaction();
  }

  async handlePaymentInfo(
    builder: PaymentMethodDetailBuilder,
  ): Promise<PaymentMethod | IPaymentMethodResult> {
    const { transactionType, ...rest } = builder;
    switch (builder.transactionType) {
      case TransactionType.AllPaymentDetail:
        return this.doTransaction<IPaymentMethodResult>(
          "GET",
          "payment-methods",
          undefined,
          builder.query,
        );
      case TransactionType.SinglePaymentDetail: {
        const { paymentMethod, query } = builder;
        return this.doTransaction<IPaymentMethodResult>(
          "GET",
          `payment-methods/${paymentMethod.id}`,
          undefined,
          query,
        ).then((transaction) =>
          Object.assign(new PaymentMethod(), transaction),
        );
      }
      case TransactionType.Tokenize: {
        const {
          paymentMethod: { paymentMethodType, paymentOption, ...card },
          ...others
        } = rest;
        return this.doTransaction<PaymentMethod>(
          "POST",
          "payment-methods",
          snakeCase(
            { ...others, card },
            {
              deep: true,
            },
          ),
        ).then((transaction) =>
          Object.assign(new PaymentMethod(), transaction),
        );
      }
      case TransactionType.Detokenize: {
        const { paymentMethod } = builder;
        return this.doTransaction<PaymentMethod>(
          "POST",
          `payment-methods/${paymentMethod.id}/detokenize`,
        ).then((transaction) =>
          Object.assign(new PaymentMethod(), transaction),
        );
      }
      case TransactionType.Edit: {
        const { paymentMethod } = builder;
        if (paymentMethod) {
          const { card } = paymentMethod;
          return this.doTransaction<PaymentMethod>(
            "PATCH",
            `payment-methods/${paymentMethod.id}`,
            snakeCase({ card }, { deep: true }),
          ).then((transaction) =>
            Object.assign(new PaymentMethod(), transaction),
          );
        }
      }
      case TransactionType.Delete: {
        const { paymentMethod } = builder;
        if (paymentMethod) {
          return this.doTransaction<PaymentMethod>(
            "DELETE",
            `payment-methods/${paymentMethod.id}`,
          ).then((transaction) =>
            Object.assign(new PaymentMethod(), transaction),
          );
        }
      }
    }
    return new PaymentMethod();
  }

  public async getAuthorizationHeader(): Promise<IPaymentGateway> {
    const date = new Date();
    this.nonce = date.toISOString();

    const s512Txt = this.nonce + this.appKey;
    const secret = CryptoJS.SHA512(s512Txt).toString(CryptoJS.enc.Hex);

    const redis = new Redis();
    const values = await redis.mget(["token", "expires_at"]);

    const token = values[0];
    const expires_at = values[1];
    if (moment(expires_at as string).toDate() >= moment().toDate()) {
      this.headers[RestGateway.AUTHORIZATION_HEADER] = `Bearer ${token}`;
      return (this as unknown) as IPaymentGateway;
    }

    const data = await this.sendRequest<IAuthData>("POST", "accesstoken", {
      app_id: this.applicationId,
      secret: secret,
      grant_type: this.grantType ?? "client_credentials",
      nonce: this.nonce,
    });

    const { secondsToExpire, timeCreated } = data;
    redis.mset({
      ...data,
      expires_at: moment(timeCreated)
        .add(secondsToExpire, "seconds")
        .toDate()
        .toISOString(),
    });
    this.headers[RestGateway.AUTHORIZATION_HEADER] = `Bearer ${data.token}`;

    return (this as unknown) as IPaymentGateway;
  }

  processDispute(builder: DisputeManagementBuilder): Promise<IDisputeReport> {
    const {
      disputeManager: { type, id, ...rest },
      query,
    } = builder;
    switch (type) {
      case "DISPUTE_LIST": {
        return this.doTransaction<IDisputeReport>(
          "GET",
          "disputes",
          undefined,
          query
            ? (snakeCase(query, {
                deep: true,
              }) as IDictionary<string>)
            : undefined,
        ).then((result) => Object.assign(new DisputeManagement(), result));
      }
      case "DISPUTE_BY_ID": {
        return this.doTransaction<IDisputeReport>(
          "GET",
          `disputes/${id}`,
        ).then((result) => Object.assign(new DisputeManagement(), result));
      }
      case "CHALLENGE": {
        return this.doTransaction<IDisputeReport>(
          "POST",
          `disputes/${id}/challenge`,
          snakeCase(rest, {
            deep: true,
          }),
        ).then((result) => Object.assign(new DisputeManagement(), result));
      }
      case "ACCEPTANCE": {
        return this.doTransaction<IDisputeReport>(
          "POST",
          `disputes/${id}/acceptance`,
        ).then((result) => Object.assign(new DisputeManagement(), result));
      }
      case "DISPUTE_DOC": {
        const { docId } = rest as { docId: string };
        return this.doTransaction<IDisputeReport>(
          "GET",
          `disputes/${id}/documents/${docId}`,
        ).then((result) => Object.assign(new DisputeManagement(), result));
      }
    }

    return Promise.resolve({});
  }

  processAuditReport(builder: AuditTrailBuilder): Promise<IAuditReport> {
    const {
      type,
      action: { id, query },
    } = builder;

    switch (type) {
      case "ACTION_LIST": {
        return this.doTransaction<IAuditReport>(
          "GET",
          "actions",
          undefined,
          snakeCase(query as any, {
            deep: true,
          }) as IDictionary<string>,
        ).then((result) => Object.assign(new Audit(), result));
      }
      case "ACTION": {
        return this.doTransaction<IAuditReport>(
          "GET",
          `actions/${id}`,
        ).then((result) => Object.assign(new Audit(), result));
      }
    }
  }

  processMerchantReport(
    builder: MerchantManagementBuilder,
  ): Promise<IMerchantReport> {
    const {
      type,
      merchant: { query, id },
    } = builder;

    switch (type) {
      case "MERCHANT_SELF_CONFIG": {
        return this.doTransaction<IMerchantReport>("GET", "").then((result) =>
          Object.assign(new MerchantManagement(), result),
        );
      }
      case "ACCOUNT_LIST": {
        return this.doTransaction<IMerchantReport>(
          "GET",
          "accounts",
          undefined,
          snakeCase(query as any, {
            deep: true,
          }) as IDictionary<string>,
        ).then((result) => Object.assign(new MerchantManagement(), result));
      }
      case "ACCOUNT_INFO": {
        return this.doTransaction<IMerchantReport>(
          "GET",
          `accounts/${id}`,
        ).then((result) => Object.assign(new MerchantManagement(), result));
      }
      case "BOARD_MERCHANT": {
      }
    }
  }
}
