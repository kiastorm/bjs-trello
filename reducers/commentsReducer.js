import { uuid } from 'uuidv4'
import { ACTION_TYPES } from '../actions';

const initialState = {};
  
  const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_TYPES.CREATE_COMMENT: {
        const { text, cardID, id } = action.payload;
  
        const newComment = {
          id: `comment-${id}`,
          text,
          cardID,
        };
  
        return { ...state, [`${newComment.id}`]: newComment };
      }

      default:
        return state;
    }
};

export default cardsReducer;