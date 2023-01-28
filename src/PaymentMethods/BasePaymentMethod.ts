import {
  EntryMode,
  PaymentMethodType,
  IPaymentMethod,
  PaymentMethod,
} from "../";

export class BasePaymentMethod {
  public paymentMethodType: PaymentMethodType;
  public paymentOption: Partial<PaymentMethod>;

  constructor(paymentMethodType: PaymentMethodType = PaymentMethodType.Credit) {
    this.paymentMethodType = paymentMethodType;

    this.set("entryMode", EntryMode.ECOM);
  }

  set name(name: string) {
    this.set("name", name);
  }

  get name() {
    return this.get("name") as string;
  }

  set entryMode(mode: EntryMode) {
    this.set("entryMode", mode);
  }

  get entryMode() {
    return this.get("entryMode") as EntryMode;
  }

  set firstName(name: string) {
    this.set("firstName", name);
  }

  set lastName(name: string) {
    this.set("lastName", name);
  }

  get firstName() {
    return this.get("firstName") as string;
  }

  get lastName() {
    return this.get("lastName") as string;
  }

  set<Key extends keyof IPaymentMethod>(key: Key, value: IPaymentMethod[Key]) {
    if (!this.paymentOption) {
      this.paymentOption = {};
    }
    this.paymentOption[key] = value;
  }

  get<Key extends keyof IPaymentMethod>(key: Key) {
    if (!this.paymentOption) return undefined;
    return this.paymentOption[key] as IPaymentMethod[Key];
  }
}
