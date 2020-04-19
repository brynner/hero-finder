import { createStore } from "redux";
import editModeReducer from "./reducers/editModeReducer";

function configureStore(state = { editing: true }) {
  return createStore(editModeReducer, state);
}

export default configureStore;