import _ from 'lodash'
import {
  SELECTED_TEAM,
  FONT_CHANGED,
  JERSEY_TEXT_CHANGED,
  JERSEY_TEXTCOLOR_CHANGED,
} from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case SELECTED_TEAM:
      return action.payload
    case FONT_CHANGED:
      return updateFont(state, action.payload)
    case JERSEY_TEXT_CHANGED:
      return updateJerseyText(state, action.payload)
    case JERSEY_TEXTCOLOR_CHANGED:
      return updateJerseyTextColors(state, action.payload)
    default:
      return state
  }
}

const updateFont = (state, font) => {
  let newState = { ...state }
  const oldFont = new RegExp(state.products.selectedFont, 'g')
  newState.products.home.jersey.frontImage = _.replace(
    newState.products.home.jersey.frontImage,
    oldFont,
    font
  )

  newState.products.away.jersey.frontImage = _.replace(
    newState.products.away.jersey.frontImage,
    oldFont,
    font
  )
  newState.products.selectedFont = font
  return newState
}

const updateJerseyText = (state, typeAndText) => {
  let newState = { ...state }
  const jerseyType = Object.keys(typeAndText)[0]

  let jersey = {}
  switch (jerseyType) {
    case 'home':
      jersey = _.clone(state.products.home.jersey)
      jersey.frontText = typeAndText.home
      jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
      newState.products.home.jersey = jersey
      break
    case 'away':
      jersey = _.clone(state.products.away.jersey)
      jersey.frontText = typeAndText.away
      jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
      newState.products.away.jersey = jersey
      break
    default:
      return newState
  }
  return newState
}

const updateJerseyTextColors = (state, typeAndColors) => {
  let newState = { ...state }
  const jerseyType = Object.keys(typeAndColors)[0]

  let jersey = {}
  switch (jerseyType) {
    case 'home':
      jersey = _.clone(state.products.home.jersey)
      jersey.textColor = typeAndColors.home.text[1]
      jersey.textColorCode = typeAndColors.home.text[0]
      jersey.strokeColor = typeAndColors.home.stroke[1]
      jersey.strokeColorCode = typeAndColors.home.stroke[0]
      jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
      newState.products.home.jersey = jersey
      break
    case 'away':
      jersey = _.clone(state.products.away.jersey)
      jersey.textColor = typeAndColors.away.text[1]
      jersey.textColorCode = typeAndColors.away.text[0]
      jersey.strokeColor = typeAndColors.away.stroke[1]
      jersey.strokeColorCode = typeAndColors.away.stroke[0]
      jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
      newState.products.away.jersey = jersey
      break
    default:
      return newState
  }
  return newState
}

const updateJersey = (
  {
    baseImageURL,
    baseColorCode,
    logoColorCode,
    textColorCode,
    strokeColorCode,
    frontText,
  },
  font
) =>
  _.chain(baseImageURL)
    .replace(/BASECOLOR/, baseColorCode)
    .replace(/LOGOCOLOR/, logoColorCode)
    .replace(/(TEAM|NUMBER)TEXTCOLOR/g, textColorCode)
    .replace(/(TEAM|NUMBER)STROKECOLOR/g, strokeColorCode)
    .replace(/TEAMNAME/, frontText)
    .replace(/(TEAM|NUMBER)FONT/g, font)
    .replace(/APPLICATION_TYPE/g, 'heat_transfer') //TODO needs to be fixed in later version
    .replace(/PLAYERNUMBER/g, _.random(0, 99))
    .value()
