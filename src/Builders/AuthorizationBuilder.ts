import { CurrencyConversion } from "src/Entities/CurrencyConversion";
import Notification from "src/Entities/Notification";
import Order from "src/Entities/Order";
import StoredCredential from "src/Entities/StoredCredential";
import { Device } from "src/PaymentMethods/Device";
import {
  Address,
  AddressType,
  BasePaymentMethod,
  PaymentMethod,
  PaymentMethodType,
  ServicesContainer,
  Transaction,
  TransactionInitiator,
} from "../";
import { TransactionBuilder } from "./TransactionBuilder";

export class AuthorizationBuilder<T = Transaction> extends TransactionBuilder<
  T
> {
  public constructor(type: number, paymentMethod?: BasePaymentMethod) {
    if (!paymentMethod) {
      super(type);
      return;
    }

    const {
      paymentMethodType,
      paymentOption,
      ...others
    } = paymentMethod as BasePaymentMethod;
    if (paymentMethod) {
      switch (paymentMethodType) {
        case PaymentMethodType.Credit:
        case PaymentMethodType.Debit:
        case PaymentMethodType.EBT:
          super(type, ({
            card: others,
            ...paymentOption,
          } as unknown) as BasePaymentMethod);
          break;
        case PaymentMethodType.ACH:
          super(type, ({
            bankTransfer: others,
            ...paymentOption,
          } as unknown) as BasePaymentMethod);
          break;
      }
    }
  }

  /**
   * Executes the authorization builder against the gateway.
   *
   * @returns Promise<Transaction>
   */
  public async execute(): Promise<T> {
    const gateway = await ServicesContainer.instance()
      .getClient()
      .getAuthorizationHeader();

    return ((await gateway.processAuthorization(
      this as AuthorizationBuilder,
    )) as unknown) as Promise<T>;
  }

  /**
   *  Sets Information relating to a currency conversion.
   * @param currencyConversion currency conversion detail
   * @returns {TransactionBuilder}
   */
  public withCurrencyConversion(currencyConversion: CurrencyConversion) {
    if (currencyConversion !== undefined) {
      this.currencyConversion = currencyConversion;
    }
    return this;
  }

  /**
   *
   * @param {Device} device
   * @returns {TransactionBuilder}
   */
  public withDevice(device: Device) {
    if (device !== undefined) {
      this.device = device;
    }
    return this;
  }

  /**
   * @param order
   * @returns {TransactionBuilder}
   */
  public withOrder(order: Order) {
    if (order !== undefined) {
      this.order = order;
    }
    return this;
  }
  /**
   *
   * @param {string} ip
   * @returns {TransactionBuilder}
   */
  public withIpAddress(ip: string) {
    if (ip !== undefined) {
      this.ipAddress = ip;
    }
    return this;
  }

  /**
   *
   * @param {Notification} notifications
   * @returns {TransactionBuilder}
   */
  public withNotifications(notifications: Notification) {
    if (notifications !== undefined) {
      this.notifications = notifications;
    }
    return this;
  }

  /**
   *
   * @param {TransactionInitiator} initiator
   * @returns {TransactionBuilder}
   */
  public withInitiator(initiator: TransactionInitiator) {
    if (initiator !== undefined) {
      this.initiator = initiator;
    }
    return this;
  }

  public withSubCharge(amount: number | string) {
    if (amount !== undefined) {
      this.subChargeAmount = amount;
    }
    return this;
  }

  public withLanguage(language: string) {
    if (language) this.language = language;
    return this;
  }

  public withStoredCredential(storedCredential: StoredCredential) {
    if (storedCredential !== undefined) {
      this.storedCredential = storedCredential;
    }
    return this;
  }

  public withSource(source: string) {
    if (source !== undefined) {
      this.source = source;
    }
    return this;
  }

  public withConvenienceAmount(amount: string | number) {
    if (amount !== undefined) {
      this.convenienceAmount = amount;
    }
    return this;
  }

  public withSubChargeAmount(amount: string | number) {
    if (amount !== undefined) {
      this.subChargeAmount = amount;
    }
    return this;
  }

  public withCashBackAmount(amount: string | number) {
    if (amount !== undefined) {
      this.cashBackAmount = amount;
    }
    return this;
  }

  public withAuthorizationMode(mode: "PARTIAL" | undefined) {
    if (mode !== undefined) {
      this.authorizationMode = mode;
    }
    return this;
  }

  public withPaymentMethod(paymentMethod: PaymentMethod) {
    if (paymentMethod !== undefined) {
      this.paymentMethod = paymentMethod;
    }
    return this;
  }

  /**
   * Sets an address value; where applicable.
   *
   * Currently supports billing and shipping addresses.
   *
   * @param address The desired address information
   * @param addressType The desired address type
   * @returns AuthorizationBuilder
   */
  public withAddress(address?: Address, addressType = AddressType.Billing) {
    if (address === undefined) {
      return this;
    }

    address.type = addressType;

    if (addressType === AddressType.Billing) {
      this.billingAddress = address;
    } else {
      this.shippingAddress = address;
    }

    return this;
  }

  /**
   * Stored data information used to create a transaction.
   * @param {StoredCredential} storedCredential
   * @returns {AuthorizationBuilder}
   */
  public withStoreCredential(storedCredential: StoredCredential) {
    if (storedCredential !== undefined) {
      this.storedCredential = storedCredential;
    }
    return this;
  }

  /**
   * Sets the cash back amount.
   *
   * This is a specialized field for debit or EBT transactions.
   *
   * @param amount The desired cash back amount
   * @returns AuthorizationBuilder
   */
  public withCashBack(amount?: string | number) {
    if (amount !== undefined) {
      this.cashBackAmount = amount;
    }
    return this;
  }

  /**
   * Sets the Convenience amount; where applicable.
   *
   * @param convenienceAmount The Convenience amount
   * @returns AuthorizationBuilder
   */
  public withConvenienceAmt(convenienceAmount?: string | number) {
    if (convenienceAmount !== undefined) {
      this.convenienceAmount = convenienceAmount;
    }
    return this;
  }

  /**
   * Requests multi-use tokenization / card storage.
   *
   * This will depend on a successful transaction. If there was a failure
   * or decline, the multi-use tokenization / card storage will not be
   * successful.
   *
   * @param requestMultiUseToken The request flag
   * @returns AuthorizationBuilder
   */
  public withRequestMultiUseToken(requestMultiUseToken?: boolean) {
    if (requestMultiUseToken !== undefined) {
      this.paymentMethod = Object.assign(this.paymentMethod, {
        storageModel: requestMultiUseToken ? "ALWAYS" : "",
      });
    }
    return this;
  }
}
