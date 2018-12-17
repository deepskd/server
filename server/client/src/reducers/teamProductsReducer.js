import { SELECTED_TEAM } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECTED_TEAM:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
