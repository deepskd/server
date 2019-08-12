import _ from 'lodash'
import {
  SELECTED_TEAM,
  FONT_CHANGED,
  JERSEY_TEXT_CHANGED,
  JERSEY_TEXTCOLOR_CHANGED,
  BASE_COLOR_CHANGED,
  JERSEY_TEAMCREST_CHANGED,
  LOGO_COLOR_CHANGED,
  JERSEY_TEXT_SIZE_CHANGED,
  JERSEY_TEXT_STYLE_CHANGED,
  JERSEY_SLEEVE_UPDATED,
  PANT_SIDE_UPDATED,
  JERSEY_GRAPHIC_UPDATED,
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
    case JERSEY_TEXT_SIZE_CHANGED:
      return updateJerseyTextSize(state, action.payload)
    case JERSEY_TEXT_STYLE_CHANGED:
      return updateJerseyTextStyle(state, action.payload)
    case JERSEY_SLEEVE_UPDATED:
      return updateJerseySleeve(state, action.payload)
    case PANT_SIDE_UPDATED:
      return updatePantSide(state, action.payload)
    case JERSEY_GRAPHIC_UPDATED:
      return updateJerseyGraphic(state, action.payload)
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

const updateJerseyText = (state, { uniformType, colorType, frontText }) => {
  let newState = { ...state }

  if (uniformType === 'jersey') {
    let jersey = _.clone(state.products[colorType].jersey)
    jersey.frontText = frontText
    jersey.frontImage = updateJersey(jersey, state.products)
    newState.products[colorType].jersey = jersey
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
      jersey.frontImage = updateJersey(jersey, state.products)
      newState.products.home.jersey = jersey
      break
    case 'away':
      jersey = _.clone(state.products.away.jersey)
      jersey.textColor = ''
      jersey.textColorCode = typeAndColors.away.text
      jersey.strokeColor = ''
      jersey.strokeColorCode = typeAndColors.away.stroke
      jersey.frontImage = updateJersey(jersey, state.products)
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
      jersey.frontImage = updateJersey(jersey, state.products)
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
      jersey.frontImage = updateJersey(jersey, state.products)
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
  jersey.frontImage = updateJersey(jersey, state.products)
  newState.products[props.item].jersey = jersey
  return newState
}

const updateLogoColor = (state, { uniformType, colorType, colorCode }) => {
  let newState = { ...state }

  if (uniformType === 'jersey') {
    let jersey = _.clone(state.products[colorType].jersey)
    jersey.logoColorCode = colorCode
    jersey.frontImage = updateJersey(jersey, state.products)
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

const updateJerseyTextSize = (
  state,
  { uniformType, colorType, attribute, textSize }
) => {
  let newState = { ...state }

  if (uniformType === 'jersey') {
    let jersey = _.clone(state.products[colorType].jersey)
    if (attribute.type === 'text') {
      jersey.textSize = textSize
    } else if (attribute.type === 'number') {
      jersey.numberOptions[`${attribute.location}Size`] = textSize
      jersey.numberOptions[`${attribute.location}Url`] =
        state.products.decorations.jersey.number[
          `${attribute.location}`
        ].options[`${textSize}`].url
    }
    jersey.frontImage = updateJersey(jersey, state.products)
    newState.products[colorType].jersey = jersey
  }

  return newState
}

const updateJerseyTextStyle = (
  state,
  { uniformType, colorType, textStyle }
) => {
  let newState = { ...state }

  if (uniformType === 'jersey') {
    let jersey = _.clone(state.products[colorType].jersey)
    jersey.textStyle = textStyle
    jersey.frontImage = updateJersey(jersey, state.products)
    newState.products[colorType].jersey = jersey
  }

  return newState
}

const updateJerseySleeve = (
  state,
  { uniformType, colorType, sleeveOption, sleeveStripe }
) => {
  let newState = { ...state }
  if (uniformType === 'jersey') {
    let jersey = _.clone(state.products[colorType].jersey)
    switch (sleeveOption) {
      case 'none':
        jersey.sleeveOption = sleeveOption
        jersey.sleeveNumber = ''
        jersey.crestLeftSleeve = ''
        jersey.crestRightSleeve = ''
        jersey.rightSleeve = ''
        jersey.sleeveStripe =
          state.products.decorations.jersey.sleeve_no_stripe.options.url
        jersey.frontImage = updateJersey(jersey, state.products)
        newState.products[colorType].jersey = jersey
        break
      case 'jersey_sleeve_number':
        jersey.sleeveOption = sleeveOption
        jersey.crestLeftSleeve = ''
        jersey.crestRightSleeve = ''
        jersey.rightSleeve = ''
        jersey.sleeveNumber =
          state.products.decorations.jersey.sleeve_number.options.url
        jersey.sleeveStripe =
          state.products.decorations.jersey.sleeve_no_stripe.options.url
        jersey.frontImage = updateJersey(jersey, state.products)
        newState.products[colorType].jersey = jersey
        break
      case 'jersey_team_crest':
        jersey.sleeveOption = sleeveOption
        jersey.sleeveNumber = ''
        jersey.crestLeftSleeve = ''
        jersey.crestRightSleeve = ''
        jersey.rightSleeve = ''
        jersey.sleeveStripe =
          state.products.decorations.jersey.sleeve_no_stripe.options.url
        jersey.frontImage = updateJersey(jersey, state.products)
        newState.products[colorType].jersey = jersey
        break
      case 'jersey_sleeve_stripe':
        jersey.sleeveOption = sleeveOption
        jersey.sleeveNumber = ''
        jersey.crestLeftSleeve = ''
        jersey.rightSleeve = ''
        jersey.crestRightSleeve = ''
        jersey.sleeveStripe =
          sleeveStripe ||
          state.products.decorations.jersey.sleeve_no_stripe.options.url
        jersey.frontImage = updateJersey(jersey, state.products)
        newState.products[colorType].jersey = jersey
        break
      default:
        return newState
    }
  }

  return newState
}

const updatePantSide = (
  state,
  { uniformType, colorType, sideOption, sideStripe, sideText }
) => {
  let newState = { ...state }
  if (uniformType === 'pant') {
    let pant = _.clone(state.products[colorType].pant)
    switch (sideOption) {
      case 'pant_stripe':
        pant.pantStripe = sideOption
        pant.sideStripe = sideStripe
        pant.frontImage = updatePant(pant)
        newState.products[colorType].pant = pant
        break
      case 'pant_team_name':
        pant.pantStripe = sideOption
        pant.sideStripe =
          state.products.decorations.pant.side_no_stripe.options.url
        pant.sideText = sideText
        pant.frontImage = updatePant(pant)
        newState.products[colorType].pant = pant
        break
      default:
        return newState
    }
    return newState
  }

  return newState
}

const updateJerseyGraphic = (
  state,
  { uniformType, colorType, graphicStyle, graphic, graphicColorCode }
) => {
  let newState = { ...state }
  if (uniformType === 'jersey') {
    let jersey = _.clone(state.products[colorType].jersey)
    jersey.graphicStyle = graphicStyle || jersey.graphicStyle
    jersey.graphic = graphic || jersey.graphic
    jersey.graphicColorCode = graphicColorCode
    jersey.frontImage = updateJersey(jersey, state.products)
    newState.products[colorType].jersey = jersey
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
    textSize = '',
    textStyle = '',
    sleeveNumber = '',
    sleeveStripe = '',
    playerNumber = '',
    numberOptions = {},
    graphic = '',
    graphicColorCode = '',
  },
  { selectedFont, decorations }
) => {
  let lowerFront = '',
    upperFront = ''

  if (decorations.jersey.text) {
    if (decorations.jersey.text.hasOwnProperty('upper_front')) {
      const { upper_front } = decorations.jersey.text
      if (upper_front) {
        upperFront = upper_front.options[`${textSize}_${textStyle}`].url
      }

      if (decorations.jersey.text.hasOwnProperty('lower_front')) {
        const { lower_front } = decorations.jersey.text
        if (lowerFront) {
          lowerFront = lower_front.options[`${textSize}_${textStyle}`].url
        }
      }
    }
  }

  if (!frontText) {
    upperFront = ''
  }

  return _.chain(baseImageURL)
    .replace(/SLEEVE_STRIPES/, sleeveStripe)
    .replace(/JERSEYTEXT_UPPERFRONT/, upperFront)
    .replace(/JERSEYTEXT_LOWERFRONT/, lowerFront)
    .replace(/NUMBER_FRONT/, numberOptions.frontUrl)
    .replace(/NUMBER_BACK/, numberOptions.backUrl)
    .replace(/SUBLIMATION_GRAPHIC/, graphic)
    .replace(/GRAPHIC_COLOR/g, graphicColorCode)
    .replace(/BASECOLOR/, baseColorCode)
    .replace(/LOGOCOLOR/, logoColorCode)
    .replace(/SLEEVE_NUMBER/, sleeveNumber)
    .replace(/STRIPE_PRIMARY_COLOR/, textColorCode)
    .replace(/STRIPE_SECONDARY_COLOR/, strokeColorCode)
    .replace(/(TEAM|NUMBER)TEXTCOLOR/g, textColorCode)
    .replace(/(TEAM|NUMBER)STROKECOLOR/g, strokeColorCode)
    .replace(/TEAMNAME/, frontText)
    .replace(/(TEAM|NUMBER)FONT/g, selectedFont)
    .replace(/APPLICATION_TYPE/g, 'heat_transfer') //TODO needs to be fixed in later version
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/CUFFCOLOR/, cuffColorCode)
    .replace(/PIPECOLOR/, pipeColorCode)
    .replace(/TEAMCREST_LEFTSLEEVE/, crestLeftSleeve)
    .replace(/TEAMCREST_RIGHTSLEEVE/, crestRightSleeve)
    .value()
}

const updatePant = ({
  baseImageURL,
  baseColorCode,
  logoColorCode,
  textColorCode,
  strokeColorCode,
  sideStripe,
  strokeColor1,
  strokeColor2,
}) =>
  _.chain(baseImageURL)
    .replace(/PANTS_STRIPES/, sideStripe)
    .replace(/BASECOLOR/, baseColorCode)
    .replace(/LOGOCOLOR/, logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, textColorCode)
    .replace(/TEAMSTROKECOLOR/, strokeColorCode)
    .replace(/STRIPE_PRIMARY_COLOR/, strokeColor1)
    .replace(/STRIPE_SECONDARY_COLOR/, strokeColor2)
    .value()
