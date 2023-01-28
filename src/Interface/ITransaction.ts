import { Device } from "src/PaymentMethods/Device";
import { Lodging, PaymentMethod } from "..";
import { IAction, CaptureSequenceType } from "./Interfaces";

export interface ITransaction {
  id: string;
  timeCreated: string;
  type: string;
  status: string;
  channel: string;
  captureMode: string;
  authorizationMode: "PARTIAL" | undefined;
  amount: number | string;
  currency: string;
  country: string;
  merchantId: string;
  merchantName: string;
  accountId: string;
  accountName: string;
  reference: string;
  batchId: string;
  currencyConversion: any;
  action: IAction;
  paymentMethod: PaymentMethod;
  lodging: Lodging;
  totalCaptureCount: number;
  captureSequence: CaptureSequenceType;
  device: Device;
  gratuityAmount: string | number;
}
