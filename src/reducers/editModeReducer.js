export default (state, action) => {
  switch (action.type) {
    case "editMode":
      return {
        editing: action.payload
      };
    default:
      return state;
  }
};