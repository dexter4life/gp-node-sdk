export interface IAuthData {
  token: string;
  type: string;
  scope: {
    merchantId: string;
    merchantName: string;
    accounts: Array<{
      id: string;
      name: string;
      permissions: Array<string>;
    }>;
  };
  appId: string;
  appName: string;
  timeCreated: string;
  secondsToExpire: number;
  intervalToExpire: string;
  email: string;
}
