import Cookies from "js-cookie";

const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";

export function setTokens({
  refreshToken,
  accessToken,
  userId,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  Cookies.set(USERID_KEY, userId);
  Cookies.set(TOKEN_KEY, accessToken);
  Cookies.set(REFRESH_KEY, refreshToken);
  Cookies.set(EXPIRES_KEY, expiresDate);
}

export function getAccessToken() {
  const a = Cookies.get(TOKEN_KEY);
  console.log("TOKEN_KEY", a);

  return Cookies.get(TOKEN_KEY);
}

export function getRefreshToken() {
  return Cookies.get(REFRESH_KEY);
}

export function removeAuthData() {
  Cookies.remove(USERID_KEY);
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_KEY);
  Cookies.remove(EXPIRES_KEY);
}

export function getTokenExpiresDate() {
  return Cookies.get(EXPIRES_KEY);
}

export function getUserId() {
  return Cookies.get(USERID_KEY);
}

const cookieService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
};

export default cookieService;
