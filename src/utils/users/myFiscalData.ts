import apifetch from "../apifetch";
import HttpError from "../HttpError";
import { operations } from "../schema";

export const myFiscalData = async ({
  token,
}: {
  token?: string;
}): Promise<
  operations["get-users-me-fiscal"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(`${process.env.REACT_APP_API_URL}/users/me/fiscal`, {
    method: "GET",
    headers: requestHeaders,
  });
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export const putFiscalData = async ({
  data,
  token,
}: {
  token?: string;
  data: operations["put-users-me-fiscal"]["requestBody"]["content"]["application/json"];
}): Promise<
  operations["put-users-me-fiscal"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/fiscal",
    method: "PUT",
    token: token,
    body: data,
  });
};
export const postFiscalData = async ({
  data,
  token,
}: {
  token?: string;
  data: operations["post-users-me-fiscal"]["requestBody"]["content"]["application/json"];
}): Promise<
  operations["put-users-me-fiscal"]["responses"]["200"]["content"]["application/json"]
> => {
  return apifetch({
    endpoint: "/users/me/fiscal",
    method: "POST",
    token: token,
    body: data,
  });
};
