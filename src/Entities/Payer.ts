import { IPayer } from "src/PaymentMethods";
import { Address } from "./Address";

export class Payer implements IPayer {
  public name: string;
  public reference: string;
  public dateOfBirth: string;
  public landlinePhone: string;
  public mobilePhone: string;
  public billingAddress: Address;
}
