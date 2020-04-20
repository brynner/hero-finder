export default (state, action) => {
  switch (action.type) {

    case "search":
      
      console.log(action);

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

      console.log('heroChange');
      console.log(action);

      return {
        ...state,
        heroes: [...state.heroes, action.payload]
      };

    case "updateHero":
      
      console.log('updateHero');
      console.log(action);

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