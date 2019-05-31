import { FETCH_USER } from "../actions/types.js";
export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER:
      console.log(state, action);
      return state;
    default:
      return state;
  }
}
