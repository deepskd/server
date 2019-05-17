import { RETAILER_IMAGES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case RETAILER_IMAGES:
      return action.payload.data;
    default:
      return state;
  }
};
