import { EBT } from "./EBT";
import { ITrackData } from "..";
import { Device } from "./Device";

export class EBTCardTrack extends EBT implements ITrackData {
  public storageModel: "ALWAYS" | "ON_SUCCESS";
  public chipCondition: "PREV_SUCCESS" | "PREV_FAILED";
  public pinBlock: string;
  public track: string;
  public tag: string;
  device: Device;

  public constructor() {
    super();
  }

  
}
