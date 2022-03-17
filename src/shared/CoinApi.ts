import axios, { AxiosResponse, Method } from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

export const baseUrl = "https://api.coingecko.com/api/v3";

type SetState<T> = Dispatch<SetStateAction<T>>;

export function useCoinApi<T>(path: string): [T | undefined, SetState<T | undefined>] {
  const [data, setData] = useState<T>();

  useEffect(() => {
    coinApi("GET", path, setData);
  }, [path]);

  return [data, setData];
}

export function coinApi<T>(
  method: Method,
  path: string,
  callback: (data: T) => void,
  data = {}
): void {
  axios({
    method: method,
    url: `${baseUrl}/${path}`,
    data,
  }).then((response: AxiosResponse<T>) => {
    return callback(response.data);
  });
}
