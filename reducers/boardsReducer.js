import { ACTION_TYPES } from "../actions";

const initialState = {};

const boardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_LIST: {
      const { boardID, id } = action.payload;
      const board = state[boardID];
      const newListID = `list-${id}`;

      const newLists = [...board.lists, newListID];
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case ACTION_TYPES.DRAG_HAPPENED: {
      const { boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const {
        droppableIndexEnd,
        droppableIndexStart,
        type
      } = action.payload;

      if (type === "list") {
        const pulledOutList = lists.splice(droppableIndexStart, 1);
        lists.splice(droppableIndexEnd, 0, ...pulledOutList);
        board.lists = lists;

        return { ...state, [boardID]: board };
      }
      return state;
    }

    case ACTION_TYPES.DELETE_LIST: {
      const { listID, boardID } = action.payload;
      const board = state[boardID];
      const lists = board.lists;
      const newLists = lists.filter(id => id !== listID);
      board.lists = newLists;
      return { ...state, [boardID]: board };
    }

    case ACTION_TYPES.CREATE_BOARD: {
      const { name, id } = action.payload;
      const newID = `board-${id}`;
      const newBoard = {
        id: newID,
        name,
        lists: []
      };

      return { ...state, [newID]: newBoard };
    }

    default:
      return state;
  }
};

export default boardsReducer;