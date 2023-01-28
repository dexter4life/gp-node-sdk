import { GratuityPromptMode, PrintReceiptMode, IDeviceCapability } from "../";

export interface IDevice {
  time: string;
  sequenceNumber: string;
  serialNumber: string;
  gratuityPromptMode: GratuityPromptMode;
  printReceiptMode: PrintReceiptMode;
  entryModes: string[];
  capabilities: IDeviceCapability;
}

export class Device implements IDevice {
  public time: string;
  public sequenceNumber: string;
  public serialNumber: string;
  public gratuityPromptMode: GratuityPromptMode;
  public printReceiptMode: PrintReceiptMode;
  public entryModes: string[];
  public capabilities: IDeviceCapability;
}
