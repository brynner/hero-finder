import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

function configureStore(state = {
  query: '',
  editing: false, 
  heroes: []
}) {
  return createStore(rootReducer, state);
}

export default configureStore;