import gts from '../apis/gts'

import {
  RETAILER_IMAGE_STATS,
  RETAILER_IMAGES,
  ASSIGN_IMAGES_TO_TEAM,
  TEAM_IMAGE_STATS,
  TEAM_IMAGES,
} from './types'

export const getRetailerImageStats = queryString => async dispatch => {
  const response = await gts.get(`/retailerImageCount${queryString}`)
  dispatch({ type: RETAILER_IMAGE_STATS, payload: response })
}

export const getRetailerImages = (retailerId,activePage) => async dispatch => {
  let queryString = `retailerId=${retailerId}`
  if(activePage){
    queryString += `&activePage=${activePage}`
  }
  const response = await gts.get(`/images?${queryString}`)
  dispatch({ type: RETAILER_IMAGES, payload: response })
}

export const getTeamImageStats = () => async dispatch => {
  const response = await gts.get('/teamImageCount')
  dispatch({ type: TEAM_IMAGE_STATS, payload: response })
}

export const getTeamImages = teamId => async dispatch => {
  const response = await gts.get(`/images?teamId=${teamId}`)
  dispatch({ type: TEAM_IMAGES, payload: response })
}

export const assignImagesToTeam = (data, retailerId) => async dispatch => {
  const updateResponse = await gts.patch(`/images`, data)
  console.log(`${updateResponse} records updated`)
  const response = await gts.get(`/images?retailerId=${retailerId}`)
  dispatch({ type: ASSIGN_IMAGES_TO_TEAM, payload: response })
}
