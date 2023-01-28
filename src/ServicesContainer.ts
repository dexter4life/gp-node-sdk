import {
  ApiError,
  IPaymentGateway,
  IRecurringService,
  ServicesConfig,
} from "./";
import { GlobalPaymentConnector } from "./Gateways/GlobalPaymentConnector";

export class ServicesContainer {
  private static _instance: ServicesContainer;
  private _gateway: IPaymentGateway;
  private _recurring: IRecurringService;

  public static instance(): ServicesContainer {
    if (ServicesContainer._instance === null) {
      throw new ApiError("Services container not configured.");
    }
    return ServicesContainer._instance;
  }

  public static configure(config: ServicesConfig): void {
    config.validate();
    if (config.appKey && config.appKey !== "") {
      const gateway = new GlobalPaymentConnector();

      gateway.appKey = config.appKey;
      gateway.version = config.version;
      gateway.timeout = config.timeout;
      gateway.serviceUrl = config.serviceUrl;
      gateway.applicationId = config.applicationId;
      gateway.grantType = config.grantType;

      if (config.version) gateway.headers["X-GP-Version"] = config.version;
      if (config.idempotency)
        gateway.headers["x-gp-idempotency"] = config.idempotency;

      ServicesContainer._instance = new ServicesContainer(gateway);
    }
  }

  public constructor(gateway?: IPaymentGateway, recurring?: IRecurringService) {
    if (gateway) {
      this._gateway = gateway;
    }
    if (recurring) {
      this._recurring = recurring;
    }
  }

  public getAuthorizationHeader() {
    if (this._gateway) this._gateway.getAuthorizationHeader();
  }
  public getClient(): IPaymentGateway {
    return this._gateway;
  }

  public getRecurringClient(): IRecurringService {
    return this._recurring;
  }
}
