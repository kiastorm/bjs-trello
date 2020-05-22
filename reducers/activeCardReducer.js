import { ACTION_TYPES } from "../actions";

const initialState = null;

const activeCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ACTIVE_CARD: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default activeCardReducer;