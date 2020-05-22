import { uuid } from 'uuidv4'
import { ACTION_TYPES } from '../actions';

const initialState = {};  

const listsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_LIST: {
      const { title, id } = action.payload;
      const newList = {
        title: title,
        id: `list-${id}`,
        cards: []
      };

      const newState = { ...state, [newList.id]: newList };

      return newState;
    }

    case ACTION_TYPES.CREATE_CARD: {
      const { listID, id } = action.payload;
      const list = state[listID];
      list.cards.push(`card-${id}`);
      return { ...state, [listID]: list };
    }

    case ACTION_TYPES.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,

        type
      } = action.payload;

      // draggin lists around - the listOrderReducer should handle this
      if (type === "list") {
        return state;
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state[droppableIdStart];
        const card = list.cards.splice(droppableIndexStart, 1);
        list.cards.splice(droppableIndexEnd, 0, ...card);
        return { ...state, [droppableIdStart]: list };
      }

      // other list
      if (droppableIdStart !== droppableIdEnd) {
        // find the list where the drag happened
        const listStart = state[droppableIdStart];
        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1);
        // find the list where the drag ended
        const listEnd = state[droppableIdEnd];

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card);
        return {
          ...state,
          [droppableIdStart]: listStart,
          [droppableIdEnd]: listEnd
        };
      }
      return state;

    case ACTION_TYPES.DELETE_CARD: {
      const { listID, id } = action.payload;

      const list = state[listID];
      const newCards = list.cards.filter(card => card.id !== id);

      return { ...state, [listID]: { ...list, cards: newCards } };
    }

    case ACTION_TYPES.EDIT_LIST_NAME: {
      const { listID, newName } = action.payload;

      const list = state[listID];
      list.title = newName;
      return { ...state, [listID]: list };
    }

    case ACTION_TYPES.DELETE_LIST: {
      const { listID } = action.payload;
      const newState = state;
      delete newState[listID];
      return newState;
    }

    default:
      return state;
  }
};


export default listsReducer;