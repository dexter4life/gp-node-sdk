export class ServicesConfig {
  public version: string;
  public appKey: string;
  public applicationId: string;
  public grantType: string;

  // common
  public serviceUrl: string;
  public timeout: number;
  public idempotency: string;
  public permissions: string[];

  public constructor() {
    this.timeout = 65000;
  }

  public validate() {
    // if (this.secretApiKey) {
    //   if (
    //     this.applicationId ||
    //     this.grantType ||
    //     this.nonce ||
    //     this.versionNumber
    //   ) {
    //     throw new ConfigurationError(
    //       "Configuration contains both secret api key and legacy credentials. These are mutually exclusive.",
    //     );
    //   }
    // }
  }
}
