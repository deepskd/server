import _ from "lodash";
import { SELECTED_TEAM, FONT_CHANGED } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECTED_TEAM:
      return action.payload;
    case FONT_CHANGED:
      console.log(state);
      console.log(action.payload);
      return updateFont(state, action.payload);
    default:
      return state;
  }
};

const updateFont = (state, font) => {
  let newState = { ...state };
  const oldFont = new RegExp(state.products.selectedFont, "g");

  newState.products.home.jersey = _.replace(
    newState.products.home.jersey,
    oldFont,
    font
  );

  newState.products.away.jersey = _.replace(
    newState.products.away.jersey,
    oldFont,
    font
  );
  newState.products.selectedFont = font;
  return newState;
};
