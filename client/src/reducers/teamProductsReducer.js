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
      jersey = state.products.home.jersey
      jersey.frontText = typeAndText.home
      jersey = updateJersey(jersey, state.products.selectedFont)
      newState.products.home.jersey = jersey
      break
    case 'away':
      jersey = state.products.away.jersey
      jersey.frontText = typeAndText.away
      jersey = updateJersey(jersey, state.products.selectedFont)
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
      jersey = state.products.home.jersey
      jersey.textColor = typeAndColors.home.text[1]
      jersey.textColorCode = typeAndColors.home.text[0]
      jersey.strokeColor = typeAndColors.home.stroke[1]
      jersey.strokeColorCode = typeAndColors.home.stroke[0]
      jersey = updateJersey(jersey, state.products.selectedFont)
      newState.products.home.jersey = jersey
      break
    case 'away':
      jersey = state.products.away.jersey
      jersey.textColor = typeAndColors.away.text[1]
      jersey.textColorCode = typeAndColors.away.text[0]
      jersey.strokeColor = typeAndColors.away.stroke[1]
      jersey.strokeColorCode = typeAndColors.away.stroke[0]
      jersey = updateJersey(jersey, state.products.selectedFont)
      newState.products.away.jersey = jersey
      break
    default:
      return newState
  }
  return newState
}

const updateJersey = (jersey, font) => {
  jersey.frontImage = _.replace(
    jersey.baseImageURL,
    /BASECOLOR/,
    jersey.baseColorCode
  )
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /LOGOCOLOR/,
    jersey.logoColorCode
  )
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)TEXTCOLOR/g,
    jersey.textColorCode
  )
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /(TEAM|NUMBER)STROKECOLOR/g,
    jersey.strokeColorCode
  )

  jersey.frontImage = _.replace(jersey.frontImage, /TEAMNAME/, jersey.frontText)
  jersey.frontImage = _.replace(jersey.frontImage, /(TEAM|NUMBER)FONT/g, font)
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /APPLICATION_TYPE/g,
    'heat_transfer'
  )
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /APPLICATION_TYPE/g,
    'heat_transfer'
  )

  jersey.frontImage = _.replace(
    jersey.frontImage,
    /PLAYERNUMBER/g,
    _.random(0, 99)
  )

  return jersey
}
