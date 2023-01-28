import { CurrencyConversion } from "src/Entities/CurrencyConversion";
import Notification from "src/Entities/Notification";
import Order from "src/Entities/Order";
import StoredCredential from "src/Entities/StoredCredential";
import { Device } from "src/PaymentMethods/Device";
import {
  BasePaymentMethod,
  CaptureMode,
  CaptureSequenceType,
  IAction,
  ITransaction,
  Lodging,
  Payer,
  PaymentMethod,
  TransactionChannel,
  TransactionInitiator,
  TransactionType,
} from "../";
import { BaseBuilder } from "./BaseBuilder";

export abstract class TransactionBuilder<T> extends BaseBuilder<T>
  implements ITransaction {
  public accountId: string;
  public captureMode: CaptureMode;
  public channel: TransactionChannel;
  public accountName: string;
  public country: string;
  public authorizationMode: "PARTIAL" | undefined;
  public currency: string;
  public amount: string | number;
  public cashBackAmount: string | number;
  public subChargeAmount: string | number;
  public convenienceAmount: string | number;
  public description: string;
  public language: string;
  public ipAddress: string;
  public reference: string;
  public siteReference: string;
  public userReference: string;
  public payerReference: string;
  public order: Order;
  public source: string;
  public currencyConversion: CurrencyConversion;
  public initiator: TransactionInitiator;
  public storedCredential: StoredCredential;
  public notifications: Notification;
  public payer: Payer;
  public id: string;
  public timeCreated: string;
  public type: string;
  public status: string;
  public merchantId: string;
  public merchantName: string;
  public batchId: string;
  public action: IAction;
  public paymentMethod: PaymentMethod;
  public lodging: Lodging;
  public totalCaptureCount: number;
  public captureSequence: CaptureSequenceType;
  public device: Device;
  public gratuityAmount: string | number;
  public model: string | "FROM_TRANSACTION_CURRENCY";

  public constructor(type: TransactionType, paymentMethod?: BasePaymentMethod) {
    super();

    this.transactionType = type;
    if (paymentMethod) {
      this.paymentMethod = (paymentMethod as unknown) as PaymentMethod;
    }
  }

  /**
   *
   *
   * @param amount The amount
   * @returns AuthorizationBuilder
   */
  public withAmount(amount?: string) {
    if (amount !== undefined) {
      this.amount = amount;
    }
    return this;
  }

  public withChannel(channel: TransactionChannel = "CNP") {
    if (channel !== undefined) {
      this.channel = channel;
    }
    return this;
  }
  /**
   * Sets the transaction's currency; where applicable.
   *
   * The formatting for the supplied value will currently depend on
   * the configured gateway's requirements.
   *
   * @param currency The currency
   * @returns AuthorizationBuilder
   */
  public withCurrency(currency?: string) {
    if (currency !== undefined) {
      this.currency = currency;
    }
    return this;
  }

  public withCountry(country: string) {
    if (country !== undefined) {
      this.country = country;
    }
    return this;
  }

  /**
   * Sets the gratuity amount; where applicable.
   *
   * This value is information only and does not affect
   * the authorization amount.
   *
   * @param gratuity The gratuity amount
   * @returns TransactionBuilder
   */
  public withGratuity(gratuityAmount?: string | number) {
    if (gratuityAmount !== undefined) {
      this.gratuityAmount = gratuityAmount;
    }
    return this;
  }

  public withGratuityAmount(amount: string | number) {
    if (amount !== undefined) {
      this.gratuityAmount = amount;
    }
    return this;
  }

  public withCaptureSequence(captureSequence: CaptureSequenceType) {
    if (captureSequence !== undefined) {
      this.captureSequence = captureSequence;
    }
    return this;
  }

  public withTotalCaptureCount(count: number) {
    if (count !== undefined) {
      this.totalCaptureCount = count;
    }
    return this;
  }

  /**
   * Sets the transaction's order reference; where applicable.
   *
   * @param reference The order reference
   * @returns AuthorizationBuilder
   */
  public withOrderReference(reference?: string) {
    if (reference !== undefined) {
      this.order = { reference };
    }
    return this;
  }

  /**
   * @param {Lodging} lodging
   * @returns TransactionBuilder
   */
  public withLodging(lodging: Lodging) {
    if (lodging !== undefined) {
      this.lodging = lodging;
    }
    return this;
  }

  public withAccountName(name: string) {
    if (name !== undefined) {
      this.accountName = name;
    }
    return this;
  }

  public withAccountId(id: string) {
    if (id !== undefined) {
      this.accountId = id;
    }
    return this;
  }

  /**
   * Merchant defined field to reference the transaction. minLength: 8 maxLength: 50
   * @param {String} reference
   * @returns {AuthorizationBuilder}
   */
  public withReference(reference: string) {
    if (reference !== undefined) {
      this.reference = reference;
    }
    return this;
  }

  /**
   * Merchant defined field to reference the transaction. minLength: 8 maxLength: 50
   * @param {String} reference
   * @returns {AuthorizationBuilder}
   */
  public withReferences(references: {
    reference?: string;
    siteReference?: string;
    userReference?: string;
    payerReference?: string;
  }) {
    if (references && references.userReference)
      this.userReference = references.userReference;

    if (references && references.payerReference)
      this.payerReference = references.payerReference;

    if (references && references.reference)
      this.reference = references.reference;

    if (references && references.siteReference)
      this.siteReference = references.siteReference;

    return this;
  }

  public withPartnerAmount(amount: string) {
    if (amount !== undefined) {
      this.partnerAmount = amount;
    }
    return this;
  }

  public withPayer(payer: Payer) {
    if (payer !== undefined) {
      this.payer = payer;
    }
    return this;
  }

  /**
   * Sets the transaction's description.
   *
   * This value is not guaranteed to be sent in the authorization
   * or settlement process.
   *
   * @param description The description
   * @returns AuthorizationBuilder
   */
  public withDescription(description?: string) {
    if (description !== undefined) {
      this.description = description;
    }
    return this;
  }

  public withProviderPayerReference(reference: string) {
    if (reference !== undefined) {
      this.paymentMethod = Object.assign(this.paymentMethod ?? {}, {
        apm: { providerPayerReference: reference },
      });
    }
    return this;
  }

  /**
   * Indicates whether the transaction is to be captured automatically,
   * later or later using more than 1 partial capture. * AUTO - If a transaction
   * is authorized, funds will exchange between the payer and merchant automatically
   * and as soon as possible. * LATER - If a transaction is authorized, funds will
   * not exchange between the payer and merchant automatically and will require a
   * subsequent separate action to capture that transaction and start the funding process.
   *  Only one successful capture is permitted. * MULTIPLE - If a transaction is authorized,
   * funds will not exchange between the payer and merchant automatically.
   * One or more subsequent separate capture actions are required to capture
   * that transaction in parts and start the funding process for the part captured.
   * One or many successful capture are permitted once the total
   * amount captured is within a range of the original authorized amount.'
   *
   * @param {CaptureMode} mode
   * @returns TransactionBuilder
   */
  public withCapture(capture: {
    mode: CaptureMode;
    totalCaptureCount?: number;
  }) {
    if (capture !== undefined) {
      this.captureMode = capture.mode;
      if (capture.totalCaptureCount)
        this.totalCaptureCount = Number(capture.totalCaptureCount);
    }
    return this;
  }

  /**
   * @param device
   * @returns TransactionBuilder
   */
  public withDevice(device: Device) {
    if (device !== undefined) {
      this.device = device;
    }
    return this;
  }

  public withTransactionModel(model: string) {
    if (model !== undefined) {
      this.model = model;
    }
    return this;
  }

  public withMerchantId(merchantId: string) {
    if (merchantId !== undefined) {
      this.merchantId = merchantId;
    }
    return this;
  }

  public withMerchantName(merchantName: string) {
    if (merchantName !== undefined) {
      this.merchantName = merchantName;
    }
    return this;
  }

  public withCurrencyConversion(value: CurrencyConversion) {
    if (value !== undefined) {
      this.currencyConversion = Object.assign(
        this.currencyConversion ?? {},
        value,
      );
    }
    return this;
  }
}
