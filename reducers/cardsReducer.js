import { uuid } from 'uuidv4'
import { ACTION_TYPES } from '../actions';

const initialState = {};
  
  const cardsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACTION_TYPES.CREATE_CARD: {
        const { title, listID, id } = action.payload;
  
        const newCard = {
          title,
          id: `card-${id}`,
          listID,
          comments: [],
          body: null
        };
  
        return { ...state, [`card-${id}`]: newCard };
      }

      case ACTION_TYPES.CREATE_COMMENT: {
        const { cardID, id } = action.payload;

        const card = state[cardID];
        card.comments.unshift(`comment-${id}`);
        return { ...state, [cardID]: card };
      }
      
      case ACTION_TYPES.UPDATE_CARD: {
        const { id, body: newBody, title: newTitle, comments: newComments } = action.payload;
        const newCard = state[id];
        newCard.body = newBody || newCard.body;
        newCard.title = newTitle || newCard.title;
        newCard.comments = newComments || newCard.comments;

        return { ...state, [`${id}`]: newCard, activeCardCurrentState: 'IDLE' };
      }
  
      case ACTION_TYPES.DELETE_CARD: {
        const { id } = action.payload;
        const newState = state;
        delete newState[id];

        return newState;
      }
      default:
        return state;
    }
};

export default cardsReducer;