import { ACTION_TYPES } from "../actions";
import uuid from "uuidv4";

const initialState = [];

const boardOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_BOARD: {
      return [...state, `board-${action.payload.id}`];
    }
    default:
      return state;
  }
};

export default boardOrderReducer;