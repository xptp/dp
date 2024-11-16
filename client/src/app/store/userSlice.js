import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import cookieService from "../service/cookie.service";
import { generetaAuthError } from "../utils/generateAuthError";

const initialState = cookieService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: cookieService.getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
      dataLoaded: false,
    };

console.log("Initial state:", initialState);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      console.log("a", state.user);
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
      dispatch(authRequestSuccess({ userId: data.userId }));

      navigate(redirect);
    } catch (error) {
      const { code, message } = error.response.data.error;
      if (code === 400) {
        const errorMessage = generetaAuthError(message);
        console.log("errorMessage", errorMessage);

        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp =
  ({ payload, redirect, navigate }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.register({ email, password });
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

export const getCurrentUserData = (state) => {
  console.log("state", state);

  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};

export const getUserById = (userId) => (state) => {
  if (state.users.entities) {
    return state.users.entities.find((u) => u._id === userId);
  }
};

export default userSlice.reducer;
// import { createAction, createSlice } from "@reduxjs/toolkit";
// import authService from "../service/auth.service";
// import cookieService from "../service/cookie.service";
// import { createBrowserHistory } from "history";
// import { generetaAuthError } from "../utils/generateAuthError";
// // import history from "../utils/history";

// const historyS = createBrowserHistory();

// const initialState = cookieService.getAccessToken()
//   ? {
//       entities: null,
//       isLoading: true,
//       error: null,
//       auth: { userId: cookieService.getUserId() },
//       isLoggedIn: true,
//       dataLoaded: false,
//     }
//   : {
//       entities: null,
//       isLoading: false,
//       error: null,
//       auth: null,
//       isLoggedIn: false,
//       dataLoaded: false,
//     };

// console.log(initialState);

// const userSlice = createSlice({
//   name: "users",
//   initialState,

//   reducers: {
//     loginSuccess: (state, action) => {
//       state.user = action.payload;
//       console.log("a", state.user);
//     },
//     logout: (state) => {
//       state.user = null;
//       state.entities = null;
//       state.isLoading = false;
//       state.error = null;
//       state.auth = null;
//       state.isLoggedIn = false;
//       state.dataLoaded = false;
//       cookieService.removeAuthData();
//     },
//     authRequestSuccess: (state, action) => {
//       state.auth = action.payload;
//       state.isLoggedIn = true;
//     },
//     authRequestFailed: (state, action) => {
//       state.error = action.payload;
//     },
//     authRequested: (state) => {
//       state.error = null;
//     },
//   },
// });

// const authRequested = createAction("users/authRequested");
// export const { loginSuccess, logout, authRequestSuccess, authRequestFailed } =
//   userSlice.actions;

// export const login =
//   ({ payload, redirect }) =>
//   async (dispatch) => {
//     const { email, password } = payload;
//     dispatch(authRequested());
//     try {
//       const data = await authService.login({ email, password });
//       cookieService.setTokens(data);
//       console.log("data", data);

//       dispatch(authRequestSuccess({ userId: data.userId }));

//       // historyS.push(redirect);
//     } catch (error) {
//       const { code, message } = error.response.data.error;
//       if (code === 400) {
//         const errorMessage = generetaAuthError(message);
//         dispatch(authRequestFailed(errorMessage));
//       } else {
//         dispatch(authRequestFailed(error.message));
//       }
//     }
//   };

// export const signUp =
//   ({ payload }) =>
//   async (dispatch) => {
//     const { email, password } = payload;
//     // dispatch(authRequested());
//     try {
//       const data = await authService.register({ email, password });
//       cookieService.setTokens(data);
//       console.log("data", data);
//       dispatch(authRequestSuccess({ userId: data.userId }));
//     } catch (error) {
//       dispatch(authRequestFailed(error.message));
//     }
//   };

// export const logoutUser = () => async (dispatch) => {
//   try {
//     await authService.logout();
//     dispatch(logout());
//   } catch (error) {
//     // console.error("Error logging out:", error);
//   }
// };

// export const getCurrentUserData = () => (state) => {
//   console.log("state", state);

//   // return state.users.entities
//   //   ? state.users.entities.find((u) => u._id === state.users.auth.userId)
//   //   : null;
// };
// export const getUserById = (userId) => (state) => {
//   if (state.users.entities) {
//     return state.users.entities.find((u) => u._id === userId);
//   }
// };

// export default userSlice.reducer;
