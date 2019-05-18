import { RETAILER_IMAGE_STATS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case RETAILER_IMAGE_STATS:
      return action.payload.data;
    default:
      return state;
  }
};
