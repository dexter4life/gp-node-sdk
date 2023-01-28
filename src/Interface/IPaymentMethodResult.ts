export interface ICardResult {
  numberLast4: string;
  brand: string;
  expiryMonth: string;
  expiryYear: string;
}

export interface PaymentMethodDetail {
  id: string;
  timeCreated: string;
  status: "ACTIVE" | "INACTIVE";
  reference: string;
  card: ICardResult[];
}

export interface ActionResult {
  id: string;
  type: string;
  timeCreated: string;
  resultCode: string;
  appId: string;
  appName: string;
}

export interface IPaymentMethodResult {
  id: string;
  timeCreated: string;
  status: string;
  merchantId: string;
  merchantName: string;
  accountId: string;
  accountName: string;
  reference: string;
  card: {
    maskedNumberLast4: string;
    brand: string;
    expiryMonth: string;
    expiryYear: string;
  };
  action: {
    id: string;
    type: string;
    timeCreated: string;
    resultCode: string;
    appId: string;
    appName: string;
  };
}

// export interface IPaymentMethodResult {
//   id: string;
//   timeCreated: string;
//   status: "ACTIVE" | "INACTIVE";
//   reference: string;
//   currentPageSize: number;
//   merchantId: string;
//   merchantName: string;
//   accountId: string;
//   accountName: string;
//   filter: {
//     fromTimeCreated: string;
//     toTimeCreated: string;
//   };
//   paging: {
//     pageSize: number;
//     page: number;
//     order: "ASC" | "DESC";
//     orderBy: "TIME_CREATED" | "OTHER_PROPERTY";
//   };
//   card: ICardResult;
//   paymentMethods: PaymentMethodDetail[];
//   action: ActionResult;
// }
