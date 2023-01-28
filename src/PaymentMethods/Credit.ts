import { CvvIndicator, FundingType, ICreditCard } from "../";
import { Card } from "./Card";

export abstract class Credit extends Card implements ICreditCard {
  public number: string;
  public expiryMonth: string | number;
  public expiryYear: string | number;
  public cvv: string;
  public avsAddress: string;
  public avsPostalCode: string;
  public accountType: string;
  public funding?: FundingType;
  public authcode: string;
  public brandReference: string;
  public cvvIndicator: CvvIndicator;
  public chipCondition: "PREV_SUCCESS" | "PREV_FAILED";

  constructor(funding?: FundingType) {
    super();
    this.funding = funding;
  }
}
