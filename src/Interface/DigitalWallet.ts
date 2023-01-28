import { TokenFormat, WalletProvider, CvvIndicator } from "../";

export interface IDigitalWallet {
  token: string;
  tokenFormat: TokenFormat;
  cryptogram: string;
  provider: WalletProvider;
  expiryMonth: string;
  expiryYear: string;
  eci: string;
  cvv: string;
  cvvIndicator: CvvIndicator;
  avsAddress: string;
  avsPostalCode: string;
}

export interface DigitalWallet {
  token: string;
  tokenFormat: string;
  cryptogram: string;
  provider: string;
  expiryMonth: string;
  expiryYear: string;
  eci: string;
  cvv: string;
  cvvIndicator: string;
  avsAddress: string;
  avsPostalCode: string;
}
