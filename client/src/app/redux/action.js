import { LOGIN_SUCCESS, LOGOUT_SUCCESS } from "./actionTypes";

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
