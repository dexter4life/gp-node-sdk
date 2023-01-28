import { EBT } from "./EBT";
import { CvvIndicator, ICreditCard } from "..";

export class EBTCardData extends EBT implements ICreditCard {
  public storageModel: "ALWAYS" | "ON_SUCCESS";
  public chipCondition: "PREV_SUCCESS" | "PREV_FAILED";
  public number: string;
  public expiryMonth: string | number;
  public expiryYear: string | number;
  public cvv: string;
  public avsAddress: string;
  public avsPostalCode: string;
  public pinBlock: string;
  public cvvIndicator: CvvIndicator;

  public constructor() {
    super();
  }
}
