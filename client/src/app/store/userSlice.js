import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import cookieService from "../service/cookie.service";
import { generetaAuthError } from "../utils/generateAuthError";
import userService from "../service/user.service";

const initialState = cookieService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: cookieService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
      user: null,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
      user: null,
    };

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.dataLoaded = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.entities = null;
      state.isLoading = false;
      state.error = null;
      state.auth = null;
      state.isLoggedIn = false;
      state.dataLoaded = false;
      cookieService.removeAuthData();
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const authRequested = createAction("users/authRequested");
export const { loginSuccess, logout, authRequestSuccess, authRequestFailed } =
  userSlice.actions;

export const login =
  ({ payload, redirect, navigate }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      cookieService.setTokens(data);
      dispatch(loginSuccess(data.user));
      dispatch(authRequestSuccess({ userId: data.userId }));
      navigate(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        console.log("Ошибка", errorMessage);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp =
  ({ payload, redirect, navigate }) =>
  async (dispatch) => {
    const { email, password, admin } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password, admin });
      console.log(data);
      cookieService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      navigate(redirect);
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch(logout());
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const fetchUser = () => async (dispatch) => {
  dispatch(authRequested());
  try {
    const user = await userService.get(dispatch);
    dispatch(loginSuccess(user));
  } catch (error) {
    if (error.response && error.response.status === 401) {
      dispatch(logoutUser());
    } else {
      dispatch(authRequestFailed(error.message));
    }
  }
};

export default userSlice.reducer;
