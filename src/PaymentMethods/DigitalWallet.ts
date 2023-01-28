import { IDigitalWallet } from "src/Interface/DigitalWallet";
import { DigitalWalletBase } from "./DigitalWalletBase";
import {
  CvvIndicator,
  PaymentMethodType,
  TokenFormat,
  WalletProvider,
} from "../";

export class DigitalWallet extends DigitalWalletBase<WalletProvider>
  implements IDigitalWallet {
  constructor(provider: WalletProvider = "PAY_BY_GOOGLE") {
    super(provider);
    this.paymentMethodType = PaymentMethodType.DigitalWallet;
  }
  public provider: WalletProvider;
  public token: string;
  public tokenFormat: TokenFormat;
  public cryptogram: string;
  public expiryMonth: string;
  public expiryYear: string;
  public eci: string;
  public cvv: string;
  public cvvIndicator: CvvIndicator;
  public avsAddress: string;
  public avsPostalCode: string;
}
