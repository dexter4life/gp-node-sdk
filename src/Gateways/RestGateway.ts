import { AxiosResponse } from "axios";
import { IDictionary } from "src/Builders";
import { Gateway } from "./Gateway";

export abstract class RestGateway extends Gateway {
  public static AUTHORIZATION_HEADER = "Authorization";

  public constructor() {
    super("application/json");
  }

  removeNullAndUndefinedDeep<T>(obj: T): T {
    if (obj && typeof obj === "object") {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          obj[key] = this.removeNullAndUndefinedDeep(obj[key]);
          if (obj[key] === null || obj[key] === undefined) {
            delete obj[key];
          }
        }
      }
    } else if (obj === null || obj === undefined) {
      return undefined as T;
    }
    return obj;
  }

  public doTransaction<T = AxiosResponse>(
    verb: string,
    endpoint: string,
    requestData?: object,
    query?: IDictionary<string>,
  ): Promise<T> {
    return this.sendRequest<T>(
      verb,
      endpoint,
      this.removeNullAndUndefinedDeep(requestData),
      query,
    );
  }
}
