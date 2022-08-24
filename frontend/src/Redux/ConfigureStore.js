import { createStore, combineReducers } from "redux";

import { userReducer } from "./Reducers/user.reducer";
import { popupHandle } from "./Reducers/popup.reducer";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ user: userReducer, popup: popupHandle })
  );

  return store;
};
