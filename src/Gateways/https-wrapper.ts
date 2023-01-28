import axios, { AxiosRequestConfig } from "axios";
import camelcaseKeys from "camelcase-keys";

export const request = <T>(options: AxiosRequestConfig): Promise<T> =>
  new Promise((resolve, reject) => {
    axios(options)
      .then((response) => response.data)
      .then((data) => {
        resolve(camelcaseKeys(data, { deep: true }) as T);
      })
      .catch((reason) => {
        reject(reason);
      });
  });
