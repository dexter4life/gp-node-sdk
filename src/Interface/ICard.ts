import { CvvIndicator, FundingType } from "..";

/** Credit/debit card related */
export interface ICard {
  funding?: FundingType;
  storageModel: "ALWAYS" | "ON_SUCCESS";
  pinBlock: string;
}

/**
 * card information when EMV/chip is expected
 */

export interface ITrackData {
  track: string;
  tag: string;
  chipCondition: "PREV_SUCCESS" | "PREV_FAILED";
}

export interface ICreditCard {
  number: string;
  expiryMonth: string | number;
  expiryYear: string | number;
  cvv: string;
  cvvIndicator: CvvIndicator;
  avsAddress: string;
  avsPostalCode: string;
}
