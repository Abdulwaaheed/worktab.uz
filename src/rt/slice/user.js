import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: {
    name: "",
    surname: "",
    email: "",
    phone: "",
    password:"",
    confPass:""
}
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerUser(state, action) {
      state.token = action.payload.token;
    },
    setUser(state, action) {
      state.user = action.payload.user;
    },
    logoutUser(state) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { registerUser, setUser, logoutUser } = authSlice.actions;

const userReducer = authSlice.reducer; 

export default userReducer

