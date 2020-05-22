import { uuid } from 'uuidv4'
import { ACTION_TYPES } from '.'

export const createList = ({ title }) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    const id = uuid();

    dispatch({
      type: ACTION_TYPES.CREATE_LIST,
      payload: { title, boardID, id }
    });
  };
};


export const sort = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd,
  draggableId,
  type
) => {
  return (dispatch, getState) => {
    const boardID = getState().activeBoard;
    dispatch({
      type: ACTION_TYPES.DRAG_HAPPENED,
      payload: {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart,
        draggableId,
        type,
        boardID
      }
    });
  };
};

// export const updateTitle = (listID, newTitle) => {
//   return {
//     type: ACTION_TYPES.UPDATE_LIST_TITLE,
//     payload: {
//       listID,
//       newTitle
//     }
//   };
// };

// export const deleteList = ({ listID }) => {
//   return (dispatch, getState) => {
//     const boardID = getState().activeBoard;
//     return dispatch({
//       type: ACTION_TYPES.DELETE_LIST,
//       payload: {
//         listID,
//         boardID
//       }
//     });
//   };
// };