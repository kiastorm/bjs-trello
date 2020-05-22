import { ACTION_TYPES } from '.';
import { uuid } from "uuidv4";

export const createCard = ({listID, title}) => {
  const id = uuid();

  return {
    type: ACTION_TYPES.CREATE_CARD,
    payload: { listID, title, id }
  };
};

export const updateCard = (newCard) => {
  return {
    type: ACTION_TYPES.UPDATE_CARD,
    payload: newCard
  };
};

export const deleteCard = ({ id, listID }) => {
  return {
    type: ACTION_TYPES.DELETE_CARD,
    payload: { id, listID }
  };
};

export const setActiveCard = ({ id }) => {
  return {
    type: ACTION_TYPES.SET_ACTIVE_CARD,
    payload: id
  };
};

export const setActiveCardCurrentState = (incomingState) => {
  return {
    type: ACTION_TYPES.SET_ACTIVE_CARD_CURRENT_STATE,
    payload: incomingState,
  };
};