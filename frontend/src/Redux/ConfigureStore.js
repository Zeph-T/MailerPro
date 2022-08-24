import { createStore, combineReducers } from "redux";

import { userReducer } from "./Reducers/user.reducer";

export const ConfigureStore = () => {
  const store = createStore(combineReducers({ user: userReducer }));

  return store;
};
