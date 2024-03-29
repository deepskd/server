import {
  RETAILER_IMAGES,
  TEAM_IMAGES,
  ASSIGN_IMAGES_TO_TEAM,
} from '../actions/types'

export default (state = {}, action) => {
  switch (action.type) {
    case RETAILER_IMAGES:
      return action.payload.data
    case TEAM_IMAGES:
      return action.payload.data
    case ASSIGN_IMAGES_TO_TEAM:
      return action.payload.data
    default:
      return state
  }
}
