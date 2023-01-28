export interface IMerchantQuery {}

export interface IMerchantReport {}

export interface IMerchant {
  name: string;
  legal_name: string;
  type: "MERCHANT";
  dba: string;
  merchant_category_code: string;
  website: string;
  description: string;
  currency: string;
  tax_id_reference: string;
  notification_email: string;
  addresses: Address[];
  payment_processing_statistics: PaymentProcessingStatistics;
  tier: Tier[];
  payment_methods: PaymentMethod[];
}

export interface Address {
  functions: string[];
  line_1: string;
  line_2?: string;
  line_3?: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

export interface PaymentProcessingStatistics {
  total_monthly_sales_amount: string;
  average_ticket_sales_amount: string;
  highest_ticket_sales_amount: string;
}

export interface Tier {
  reference: string;
}

export interface PaymentMethod {
  functions: string[];
  card?: {
    name: string;
    reference: string;
    number: string;
    expiry_month: string;
    expiry_year: string;
    address: Address;
  };
  bank_transfer?: {
    name?: string;
    reference?: string;
    account_holder_type: string;
    account_type: string;
    account_number: string;
    bank: Bank;
  };
}

export interface Bank {
  name: string;
  code: string;
  international_code: string;
  address: Address;
}

export abstract class Merchant implements IMerchant {
  public query?: Partial<IMerchantQuery>;
  public id: string;
  public name: string;
  public legal_name: string;
  public type: "MERCHANT";
  public dba: string;
  public merchant_category_code: string;
  public website: string;
  public description: string;
  public currency: string;
  public tax_id_reference: string;
  public notification_email: string;
  public addresses: Address[];
  public payment_processing_statistics: PaymentProcessingStatistics;
  public tier: Tier[];
  public payment_methods: PaymentMethod[];

  constructor(id?: string) {
    if (id !== undefined) {
      this.id = id;
    }
    this.query = {};
  }

  public addPaymentOptions(method: PaymentMethod) {
    if (!this.payment_methods) {
      this.payment_methods = [];
    }
    this.payment_methods.push(method);
  }

  public addTier(tier: Tier) {
    if (!this.tier) {
      this.tier = [];
    }
    this.tier.push(tier);
  }

  public addAddress(address: Address) {
    if (!this.addresses) {
      this.addresses = [];
    }
    this.addresses.push(address);
  }
}
