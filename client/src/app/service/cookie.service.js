import Cookies from "js-cookie";

const TOKEN_KEY = "jwt-token";
const REFRESH_KEY = "jwt-refresh-token";
const EXPIRES_KEY = "jwt-expires";
const USERID_KEY = "user-local-id";
const ADMIN_KEY = "user-admin";

export function setTokens({
  refreshToken,
  accessToken,
  userId,
  admin = false,
  expiresIn = 3600,
}) {
  const expiresDate = new Date().getTime() + expiresIn * 1000;
  Cookies.set(USERID_KEY, userId);
  Cookies.set(TOKEN_KEY, accessToken);
  Cookies.set(REFRESH_KEY, refreshToken);
  Cookies.set(EXPIRES_KEY, expiresDate);
  Cookies.set(ADMIN_KEY, admin);
  console.log("Tokens set:", {
    userId,
    accessToken,
    refreshToken,
    expiresDate,
    admin,
  });
}

export function getAccessToken() {
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
  Cookies.remove(ADMIN_KEY);
}

export function getTokenExpiresDate() {
  return Cookies.get(EXPIRES_KEY);
}

export function getUserId() {
  return Cookies.get(USERID_KEY);
}

export function isAdmin() {
  console.log(Cookies.get(ADMIN_KEY));
  return Cookies.get(ADMIN_KEY) === "true";
}

export function isTokenExpired() {
  const expiresDate = Cookies.get(EXPIRES_KEY);
  if (!expiresDate) return true;
  return new Date().getTime() > expiresDate;
}

export function clearExpiredTokens() {
  if (isTokenExpired()) {
    removeAuthData();
  }
}

const cookieService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getTokenExpiresDate,
  getUserId,
  removeAuthData,
  isTokenExpired,
  clearExpiredTokens,
  isAdmin,
};

export default cookieService;
