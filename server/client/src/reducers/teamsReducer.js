export default (state = [], action) => {
  console.log(state, action);
  switch (action.type) {
    case "FIND_TEAMS":
      return action.payload.data;
    default:
      return state;
  }
};
