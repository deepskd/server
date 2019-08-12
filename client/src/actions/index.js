import gts from '../apis/gts'

import {
  FIND_TEAMS,
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
} from './types'

export const findTeams = term => async dispatch => {
  const response = await gts.get(`/teams?q=${term}`)
  dispatch({ type: FIND_TEAMS, payload: response })
}

export const selectTeam = (
  t,
  sports,
  embellishment = 'heat_transfer'
) => async dispatch => {
  const team = await gts.get(`/team?id=${t._id}`)

  let emblishmentMethod = ''
  if (sports === 'football') {
    emblishmentMethod = `&embellishmentMethod=${embellishment}`
  }
  const products = await gts.get(
    `/products?id=${t._id}&sports=${sports}${emblishmentMethod}`
  )
  const payload = { products: products.data, team: team.data }
  dispatch({ type: SELECTED_TEAM, payload })
}

export const fontChanged = font => {
  return {
    type: FONT_CHANGED,
    payload: font,
  }
}

export const jerseyTextChanged = typeAndText => {
  return {
    type: JERSEY_TEXT_CHANGED,
    payload: typeAndText,
  }
}

export const jerseyTextColorChnaged = typeAndColors => {
  return {
    type: JERSEY_TEXTCOLOR_CHANGED,
    payload: typeAndColors,
  }
}

export const baseColorChanged = props => {
  return {
    type: BASE_COLOR_CHANGED,
    payload: props,
  }
}

export const jerseyTeamCrestChanged = props => {
  return {
    type: JERSEY_TEAMCREST_CHANGED,
    payload: props,
  }
}

export const logoColorChanged = props => {
  return {
    type: LOGO_COLOR_CHANGED,
    payload: props,
  }
}

export const jerseyTextStyleChanged = props => {
  return {
    type: JERSEY_TEXT_STYLE_CHANGED,
    payload: props,
  }
}

export const jerseyTextSizeChanged = props => {
  return {
    type: JERSEY_TEXT_SIZE_CHANGED,
    payload: props,
  }
}

export const jerseySleeveUpdated = props => {
  return {
    type: JERSEY_SLEEVE_UPDATED,
    payload: props,
  }
}

export const pantSideUpdated = props => {
  return {
    type: PANT_SIDE_UPDATED,
    payload: props,
  }
}

export const jerseyGraphicUpdated = props => {
  return {
    type: JERSEY_GRAPHIC_UPDATED,
    payload: props,
  }
}
