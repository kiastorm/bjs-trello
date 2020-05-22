import { ACTION_TYPES } from "../actions";

const initialState = null;

const activeBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.SET_ACTIVE_BOARD: {
      return action.payload;
    }

    default:
      return state;
  }
};

export default activeBoardReducer;