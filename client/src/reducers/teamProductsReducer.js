import _ from "lodash";
import { SELECTED_TEAM, FONT_CHANGED, IMAGE_ROTATED } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case SELECTED_TEAM:
      return action.payload;
    case FONT_CHANGED:
      return updateFont(state, action.payload);
    case IMAGE_ROTATED:
      return rotateImage(state, action.payload);
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

const rotateImage = (state, object) => {
  let newState = { ...state };

  if (object.uniform === "home") {
    if (object.direction === "front") {
      newState.products.home.jerseyDirection = "front";
      newState.products.home.jersey = _.replace(
        newState.products.home.jersey,
        /APP18_pn1_com_(1|7)/,
        "APP18_pn1_com_1"
      );
    } else if (object.direction === "back") {
      newState.products.home.jerseyDirection = "back";
      newState.products.home.jersey = _.replace(
        newState.products.home.jersey,
        "APP18_pn1_com_1",
        "APP18_pn1_com_7"
      );
    }
  } else if (object.uniform === "away") {
    if (object.direction === "front") {
      newState.products.away.jerseyDirection = "front";
      newState.products.away.jersey = _.replace(
        newState.products.away.jersey,
        /APP18_pn1_com_(1|7)/,
        "APP18_pn1_com_1"
      );
    } else if (object.direction === "back") {
      newState.products.away.jerseyDirection = "back";
      newState.products.away.jersey = _.replace(
        newState.products.away.jersey,
        "APP18_pn1_com_1",
        "APP18_pn1_com_7"
      );
    }
  }

  return newState;
};
