import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = typeof window != 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  let store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(thunk),
  ));
  
  let persistor = persistStore(store);
  // persistor.purge();
  return { store, persistor };
};