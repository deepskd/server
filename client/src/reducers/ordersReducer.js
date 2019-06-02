import { FIND_ORDERS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FIND_ORDERS:
      return action.payload;
    default:
      return state;
  }
}
