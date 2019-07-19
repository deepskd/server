import _ from 'lodash'
import {
  SELECTED_TEAM,
  FONT_CHANGED,
  JERSEY_TEXT_CHANGED,
  JERSEY_TEXTCOLOR_CHANGED,
  BASE_COLOR_CHANGED,
  JERSEY_TEAMCREST_CHANGED,
  LOGO_COLOR_CHANGED,
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
    case BASE_COLOR_CHANGED:
      return updateBaseColor(state, action.payload)
    case JERSEY_TEAMCREST_CHANGED:
      return updateJerseyTeamCrest(state, action.payload)
    case LOGO_COLOR_CHANGED:
      return updateLogoColor(state, action.payload)
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
      jersey.textColor = ''
      jersey.textColorCode = typeAndColors.home.text
      jersey.strokeColor = ''
      jersey.strokeColorCode = typeAndColors.home.stroke
      jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
      newState.products.home.jersey = jersey
      break
    case 'away':
      jersey = _.clone(state.products.away.jersey)
      jersey.textColor = ''
      jersey.textColorCode = typeAndColors.away.text
      jersey.strokeColor = ''
      jersey.strokeColorCode = typeAndColors.away.stroke
      jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
      newState.products.away.jersey = jersey
      break
    default:
      return newState
  }
  return newState
}

const updateBaseColor = (state, props) => {
  let newState = { ...state }
  const { baseOptions } = state.products

  let jersey = {},
    pant = {}
  switch (props.item) {
    case 'home_jersey':
      jersey = _.clone(state.products.home.jersey)
      jersey.baseColorCode = props.color
      jersey.baseColorHex = baseOptions.jersey[props.color].hex
      jersey.logoColorCode =
        baseOptions.jersey[props.color].logo || jersey.logoColorCode
      jersey.pipeColorCode = baseOptions.jersey[props.color].pipe
      jersey.cuffColorCode = baseOptions.jersey[props.color].cuff
      jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
      newState.products.home.jersey = jersey
      break
    case 'away_jersey':
      jersey = _.clone(state.products.away.jersey)
      jersey.baseColorCode = props.color
      jersey.baseColorHex = baseOptions.jersey[props.color].hex
      jersey.logoColorCode =
        baseOptions.jersey[props.color].logo || jersey.logoColorCode
      jersey.pipeColorCode = baseOptions.jersey[props.color].pipe || ''
      jersey.cuffColorCode = baseOptions.jersey[props.color].cuff || ''
      jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
      newState.products.away.jersey = jersey
      break
    case 'home_pant':
      pant = _.clone(state.products.home.pant)
      pant.baseColorCode = props.color
      pant.baseColorHex = baseOptions.pant[props.color].hex
      pant.logoColorCode =
        baseOptions.pant[props.color].logo || pant.logoColorCode
      pant.frontImage = updatePant(pant)
      newState.products.home.pant = pant
      break
    case 'away_pant':
      pant = _.clone(state.products.away.pant)
      pant.baseColorCode = props.color
      pant.baseColorHex = baseOptions.pant[props.color].hex
      pant.logoColorCode =
        baseOptions.pant[props.color].logo || pant.logoColorCode
      pant.frontImage = updatePant(pant)
      newState.products.away.pant = pant
      break
    default:
      return newState
  }

  return newState
}

const updateJerseyTeamCrest = (state, props) => {
  const { team_crest } = state.products.decorations.jersey

  if (!team_crest) {
    return state
  }
  let newState = { ...state },
    jersey = {}

  jersey = _.clone(state.products[props.item].jersey)

  jersey.crestLeftSleeve = props.imageUrl
    ? _.replace(
        team_crest.options.left_sleeve.url,
        /TEAMCREST_IMAGEURL/,
        props.imageUrl
      )
    : ''
  jersey.crestRightSleeve = props.imageUrl
    ? _.replace(
        team_crest.options.right_sleeve.url,
        /TEAMCREST_IMAGEURL/,
        props.imageUrl
      )
    : ''
  jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
  newState.products[props.item].jersey = jersey
  return newState
}

const updateLogoColor = (state, { uniformType, colorType, colorCode }) => {
  let newState = { ...state }

  if (uniformType === 'jersey') {
    let jersey = _.clone(state.products[colorType].jersey)
    jersey.logoColorCode = colorCode
    jersey.frontImage = updateJersey(jersey, state.products.selectedFont)
    newState.products[colorType].jersey = jersey
  }

  if (uniformType === 'pant') {
    let pant = _.clone(state.products[colorType].pant)
    pant.logoColorCode = colorCode
    pant.frontImage = updatePant(pant)
    newState.products[colorType].pant = pant
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
    frontText = '',
    cuffColorCode = '',
    pipeColorCode = '',
    crestLeftSleeve = '',
    crestRightSleeve = '',
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
    .replace(/CUFFCOLOR/, cuffColorCode)
    .replace(/PIPECOLOR/, pipeColorCode)
    .replace(/TEAMCREST_LEFTSLEEVE/, crestLeftSleeve)
    .replace(/TEAMCREST_RIGHTSLEEVE/, crestRightSleeve)
    .value()

const updatePant = ({
  baseImageURL,
  baseColorCode,
  logoColorCode,
  textColorCode,
  strokeColorCode,
}) =>
  _.chain(baseImageURL)
    .replace(/BASECOLOR/, baseColorCode)
    .replace(/LOGOCOLOR/, logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, textColorCode)
    .replace(/TEAMSTROKECOLOR/, strokeColorCode)
    .value()
