export default (state, action) => {
  switch (action.type) {

    case "editMode":
      return {
        ...state,
        editing: action.payload
      };

    case "heroChange":
      return {
        ...state,
        heroes: [...state.heroes, action.payload]
      };
      
    default:
      return state;
  }
};