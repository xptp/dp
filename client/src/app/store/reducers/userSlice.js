import { createSlice } from "@reduxjs/toolkit";
import authService from "../../service/auth.service";
import userService from "../../service/user.service";
import cookieService from "../../service/cookie.service";
import { generetaAuthError } from "../../utils/generateAuthError";

const getInitialState = () => {
  const accessToken = cookieService.getAccessToken();
  const userId = cookieService.getUserId();

  return {
    user: null,
    auth: accessToken ? { userId } : null,
    isLoggedIn: !!accessToken,
  };
};

const initialState = {
  ...getInitialState(),
  isLoading: true,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
    },
    logout: (state) => {
      state.user = null;
      state.auth = null;
      state.error = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      cookieService.removeAuthData();
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequested: (state) => {
      state.error = null;
      state.isLoading = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const {
  loginSuccess,
  logout,
  authRequestSuccess,
  authRequested,
  authRequestFailed,
  updateUser,
} = userSlice.actions;
export const signUp =
  ({ payload, redirect, navigate }) =>
  async (dispatch) => {
    const { email, name, password, admin } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, name, password, admin });
      console.log(data);
      cookieService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      navigate(redirect);
    } catch (error) {
      dispatch(authRequestFailed(error.message));
    }
  };
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

export const logoutUser = () => async (dispatch) => {
  try {
    await authService.logout();
    dispatch(logout());
  } catch (error) {
    console.error("Error logging out:", error);
    dispatch(authRequestFailed(error.message));
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
export const updateUserProfile = (updatedData) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const updatedUser = await userService.update(updatedData);
    dispatch(updateUser(updatedUser));
    // dispatch(loginSuccess(updatedUser));
  } catch (e) {
    dispatch(authRequestFailed(e.message));
  }
};
export default userSlice.reducer;
