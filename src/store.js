import { createStore } from "redux";
import rootReducer from "./reducers/rootReducer";

function configureStore(state = {
  query: {
    searching: false, 
    string: '',
    total: 0,
    results: []
  },
  editing: false, 
  heroes: []
}) {
  return createStore(rootReducer, state);
}

export default configureStore;