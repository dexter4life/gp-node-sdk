import {
  Address,
  AuthorizationBuilder,
  EntryMode,
  InquiryType,
  TransactionType,
} from "..";

export interface IAuthable {
  authorize(amount?: string | number): AuthorizationBuilder;
}

export interface IBalanceable {
  balanceInquiry(inquiry?: InquiryType): AuthorizationBuilder;
}

export interface IDeviceCapability {
  entryModes: string[];
  payerVerifications: string[];
  mobile: string[];
  enabledResponse: string[];
  authorizationModes: string[];
  fraud: string[];
  displayLineCount: number;
}

export interface IPayer {
  name: string;
  reference: string;
  dateOfBirth: string;
  landlinePhone: string;
  mobilePhone: string;
  billingAddress: Address;
}

export interface Authentication {
  threeDs: ThreeDS;
  cavvResult: string;
}

export interface ThreeDS {
  valueResult: string;
}

export interface IApm {
  provider: string;
  redirectUrl: string;
  sessionToken: string;
  fundStatus: string;
  waitNotification: number;
  optionalRedirect: number;
  providerTransactionReference: string;
  providerTimeCreated: string;
  providerPayerName: string;
  bank: IBank;
  mandate: IMandate;
}

export interface IBank {
  name: string;
  identifierCode: string;
  iban: string;
  code: string;
  accountNumber: string;
}

export interface IMandate {
  code: string;
}

export interface IProvider {
  result: string;
  cvvResult: string;
  avsAddressResult: string;
  avsPostalCodeResult: string;
}

export interface IAction {
  id: string;
  type: string;
  timeCreated: string;
  resultCode: string;
  appId: string;
  appName: string;
}

export type CaptureSequenceType = "FIRST" | "LAST" | "SUBSEQUENT";

export interface TransactionQuery {
  page: number;
  pageSize: number;
  order: "ASC" | "DESC";
  orderBy: string | "TIME_CREATED" | "TYPE" | "ID";
  id: string;
  type: TransactionType;
  channel: "CP" | "CNP";
  amount: number | string;
  currency: string;
  numberFirst6: string;
  numberLast4: string;
  tokenFirst6: string;
  tokenLast4: string;
  accountName: string;
  brand: "VISA" | "MASTERCARD" | "AMEX" | "DINERS" | "DISCOVER" | "JCB" | "CUP";
  brandReference: string;
  authcode: string;
  reference: string;
  status:
    | "INITIATED"
    | "PENDING"
    | "PREAUTHORIZED"
    | "CAPTURED"
    | "REVERSED"
    | "DECLINED"
    | "FUNDED"
    | "REJECTED";
  fromTimeCreated: string;
  toTimeCreated: string;
  country: string;
  batchId: string;
  entryMode: EntryMode;
  name: string;
}
