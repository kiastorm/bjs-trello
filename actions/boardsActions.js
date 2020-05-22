import { uuid } from "uuidv4";
import { ACTION_TYPES } from "../actions";

export const setActiveBoard = ({ id }) => {
  return {
    type: ACTION_TYPES.SET_ACTIVE_BOARD,
    payload: id
  };
};

export const createBoard = ({ name }) => {
  const id = uuid();

  return {
    type: ACTION_TYPES.CREATE_BOARD,
    payload: { name, id }
  };
};