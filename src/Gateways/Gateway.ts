import { StringUtils } from "src/Utils";
import { RequiredUriUrl, CoreOptions } from "request";

import { IDictionary } from "../Builders";
import { request } from "./https-wrapper";

import { AxiosRequestConfig } from "axios";

export type RequestOptions = RequiredUriUrl & CoreOptions;

export abstract class Gateway {
  public headers: IDictionary<string>;
  public timeout: number;
  public version: string;
  public serviceUrl: string;
  public authorization: string;
  private contentType: string;

  public constructor(contentType: string) {
    this.contentType = contentType;
    this.headers = {};
    this.headers["Content-Type"] = this.contentType;
  }

  public sendRequest<T = any>(
    httpMethod: string,
    endpoint: string,
    data?: object,
    queryStringParams?: IDictionary<string>,
  ) {
    const queryString = this.buildQueryString(queryStringParams);

    const options: AxiosRequestConfig = {
      headers: this.headers,
      method: httpMethod,
      url: StringUtils.normalize(this.serviceUrl ?? "", endpoint, queryString),
      timeout: this.timeout || 100000,
      data: data,
    };

    return request<T>(options);
  }

  protected buildQueryString(queryStringParams?: IDictionary<string>) {
    if (queryStringParams === undefined) {
      return "";
    }
    const params: string[] = [];
    for (const param in queryStringParams) {
      if (queryStringParams.hasOwnProperty(param)) {
        params.push(
          `${encodeURIComponent(param)}=${encodeURIComponent(
            queryStringParams[param],
          )}`,
        );
      }
    }
    return `?${params.join("&")}`;
  }
}
