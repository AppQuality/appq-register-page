import HttpError from "../HttpError";

export const setOnboardingComplete = async (token?: string) => {
  if (process.env.REACT_APP_DEFAULT_TOKEN)
    token = process.env.REACT_APP_DEFAULT_TOKEN;

  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("Content-Type", "application/json");
  if (token) {
    requestHeaders.set("Authorization", "Bearer " + token);
  }
  let url = `${process.env.REACT_APP_API_URL}/users/me`;
  const res = await fetch(url, {
    method: "PATCH",
    headers: requestHeaders,
    body: JSON.stringify({ onboarding_completed: true }),
  });
  if (res.ok) {
    return await res.json();
  } else {
    const json = await res.json();
    throw new HttpError(res.status, res.statusText, json.err);
  }
};
