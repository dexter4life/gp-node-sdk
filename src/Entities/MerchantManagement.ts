import { MerchantManagementBuilder } from "src/Builders/MerchantManagementBuilder";
import { Merchant } from "./Merchant";

/**
 * Merchants represent a business entity on the Global Payments system.
 * This is the entity that is selling goods and services and has a direct contractual
 * relationship with Global Payments or with one of Global Payments partners.
 */
export class MerchantManagement extends Merchant {
  constructor(id?: string) {
    super(id);
  }

  public getMerchantConfig() {
    return new MerchantManagementBuilder("MERCHANT_SELF_CONFIG", this);
  }

  public getAccountList() {
    return new MerchantManagementBuilder("ACCOUNT_LIST", this);
  }

  public getAccount() {
    return new MerchantManagementBuilder("ACCOUNT_INFO", this);
  }

  /**
   * Underwrite and configure a Merchant with payment processing capability on the Global Payments system.
   * @returns MerchantManagementBuilder
   */
  public boardMerchant() {
    return new MerchantManagementBuilder("BOARD_MERCHANT", this);
  }
}
