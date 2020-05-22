import { combineReducers } from "redux";
import listsReducer from "./listsReducer";
import cardsReducer from "./cardsReducer";
import boardsReducer from "./boardsReducer";
import commentsReducer from "./commentsReducer";
import boardOrderReducer from "./boardOrderReducer";
import activeBoardReducer from "./activeBoardReducer";
import activeCardReducer from "./activeCardReducer";

export default combineReducers({
  lists: listsReducer,
  cards: cardsReducer,
  boards: boardsReducer,
  comments: commentsReducer,
  boardOrder: boardOrderReducer,
  activeBoard: activeBoardReducer,
  activeCard: activeCardReducer,
});
