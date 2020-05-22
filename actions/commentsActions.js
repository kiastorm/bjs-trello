import { ACTION_TYPES } from '.';
import { uuid } from "uuidv4";

export const createComment = ({ text }) => {
  return (dispatch, getState) => {
    const id = uuid();
    const cardID = getState().activeCard;

    dispatch({
      type: ACTION_TYPES.CREATE_COMMENT,
      payload: { cardID, text, id }
    });
  }
};