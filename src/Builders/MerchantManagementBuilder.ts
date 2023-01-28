import { ServicesContainer } from "src";
import { IMerchantReport, Merchant } from "src/Entities/Merchant";

export type MerchantQueryType =
  | "MERCHANT_SELF_CONFIG"
  | "ACCOUNT_LIST"
  | "ACCOUNT_INFO"
  | "BOARD_MERCHANT";

export class MerchantManagementBuilder {
  public merchant: Merchant;
  public type: MerchantQueryType;
  constructor(type: MerchantQueryType, merchant?: Merchant) {
    this.type = type;
    if (merchant !== undefined) this.merchant = merchant;
  }

  public async execute(): Promise<IMerchantReport> {
    const gateway = await ServicesContainer.instance()
      .getClient()
      .getAuthorizationHeader();

    return await gateway.processMerchantReport(this);
  }
}
