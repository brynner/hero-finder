export default (state, action) => {
  switch (action.type) {

    case "search":
      return {
        ...state,
        query: action.payload
      };

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

    case "updateHero":

      let index = action.payload.index;

      const newState = { ...state };

      newState.heroes[index] = {
        id: action.payload.id,
        name: action.payload.name,
        description: action.payload.description,
        series: action.payload.series
      };
      
      return newState;
      
    default:
      return state;
  }
};