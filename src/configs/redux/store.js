import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import userSlice from "./features/userSlice";

const rootReducers = combineReducers({
  auth: authSlice,
  user: userSlice,
});
export const store = configureStore({
  reducer: rootReducers,
});
