import { FIND_TEAMS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FIND_TEAMS:
      return action.payload.data;
    default:
      return state;
  }
};
