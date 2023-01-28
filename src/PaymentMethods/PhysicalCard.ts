import { EntryMethod, FundingType, TransactionType } from "..";
import { Credit } from "./Credit";
import { ICard, ITrackData } from "../Interface/ICard";

export class PhysicalCard extends Credit implements ITrackData, ICard {
  public track: string;
  public tag: string;
  public entryMethod: EntryMethod;
  public pinBlock: string;
  public storageModel: "ALWAYS" | "ON_SUCCESS";

  constructor(funding?: FundingType | undefined) {
    super(funding);
  }
}
