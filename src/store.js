import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

function configureStore(state = {
  query: {
    searching: false, 
    string: '',
    results: []
  },
  editing: false, 
  heroes: []
}) {
  return createStore(rootReducer, state);
}

export default configureStore;