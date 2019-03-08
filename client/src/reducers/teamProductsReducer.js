import _ from "lodash";
import {
  SELECTED_TEAM,
  FONT_CHANGED,
  JERSEY_TEXT_CHANGED
} from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECTED_TEAM:
      return action.payload;
    case FONT_CHANGED:
      return updateFont(state, action.payload);
    case JERSEY_TEXT_CHANGED:
      return updateJerseyText(state, action.payload);
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

const updateJerseyText = (state, typeAndText) => {
  let newState = { ...state };
  const jerseyType = Object.keys(typeAndText)[0];

  switch (jerseyType) {
    case "home":
      const oldHomeText = newState.products.home.jersey.frontImage.match(
        /teamnam(e|e_straight)?.{3}text=(([A-Z]|\s|-|\[|\])+)/
      )[2];
      newState.products.home.jersey.frontImage = _.replace(
        newState.products.home.jersey.frontImage,
        oldHomeText,
        typeAndText.home
      );
      break;
    case "away":
      let oldAwayText = newState.products.away.jersey.frontImage.match(
        /teamnam(e|e_straight)?.{3}text=(([A-Z]|\s|-|\[|\])+)/
      )[2];
      newState.products.away.jersey.frontImage = _.replace(
        newState.products.away.jersey.frontImage,
        oldAwayText,
        typeAndText.away
      );
      break;
    default:
      return newState;
  }
  return newState;
};
