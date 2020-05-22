export * from "./listsActions";
export * from "./cardsActions";
export * from "./boardsActions";
export * from "./commentsActions";

export const ACTION_TYPES = {
    CREATE_BOARD: "CREATE_BOARD",
    CREATE_COMMENT: "CREATE_COMMENT",
    CREATE_LIST: "CREATE_LIST",
    DRAG_HAPPENED: "DRAG_HAPPENED",
    CREATE_CARD: "CREATE_CARD",
    UPDATE_CARD: "UPDATE_CARD",
    DELETE_CARD: "DELETE_CARD",
    SET_ACTIVE_BOARD: "SET_ACTIVE_BOARD",
    SET_ACTIVE_CARD: "SET_ACTIVE_CARD",
    SET_ACTIVE_CARD_CURRENT_STATE: "SET_ACTIVE_CARD_CURRENT_STATE"
  };