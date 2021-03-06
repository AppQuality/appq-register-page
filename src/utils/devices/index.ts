import HttpError from "../HttpError";
import { operations } from "../schema";

export const getModels = async ({
  token,
  deviceType,
}: {
  token?: string;
  deviceType: number;
}): Promise<
  operations["get-devices-devices-type-model"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/devices/${deviceType}/models`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export const getOsPlatforms = async ({
  token,
  deviceType,
  query,
}: {
  token?: string;
  deviceType: number;
  query?: operations["get-devices-operating-systems"]["parameters"]["query"];
}): Promise<
  operations["get-devices-operating-systems"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }

  let params = "";
  if (query && Object.keys(query).length) {
    let urlps = new URLSearchParams();
    if (query.filterBy) {
      Object.entries(query.filterBy).forEach(([key, val]) => {
        if (typeof val === "string") {
          urlps.set(`filterBy[${key}]`, val);
        }
      });
    }
    params = "?" + urlps.toString();
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/devices/${deviceType}/operating_systems${params}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};

export const getOsVersions = async ({
  token,
  deviceType,
  query,
}: {
  token?: string;
  deviceType: number;
  query?: operations["get-devices-os-versions"]["parameters"]["query"];
}): Promise<
  operations["get-devices-os-versions"]["responses"]["200"]["content"]["application/json"]
> => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }

  let params = "";
  if (query && Object.keys(query).length) {
    let urlps = new URLSearchParams();
    if (query.filterBy) {
      Object.entries(query.filterBy).forEach(([key, val]) => {
        if (typeof val === "string") {
          urlps.set(`filterBy[${key}]`, val);
        }
      });
    }
    params = "?" + urlps.toString();
  }
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/devices/${deviceType}/os_versions${params}`,
    {
      method: "GET",
      headers: requestHeaders,
    }
  );
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};
