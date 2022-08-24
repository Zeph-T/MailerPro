import { UPDATE_POPUP_STATE } from "../ActionTypes";

export const popupHandle = (
  state = {
    open: false,
    component: null,
  },
  action
) => {
  switch (action.type) {
    case UPDATE_POPUP_STATE: {
      const updatedState = JSON.parse(JSON.stringify(state));
      if (action.payload.open !== undefined || action.payload.open !== null) {
        updatedState.open = action.payload.open;
      }
      if (
        action.payload.component !== undefined ||
        action.payload.component !== null
      ) {
        updatedState.component = action.payload.component;
      }
      return updatedState;
    }
    default:
      return state;
  }
};
