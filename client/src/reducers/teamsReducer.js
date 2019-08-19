import { FIND_TEAMS, ASSIGN_IMAGES_TO_TEAM, GET_TEAMS } from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case FIND_TEAMS:
      return action.payload.data
    case ASSIGN_IMAGES_TO_TEAM:
      return []
    case GET_TEAMS: //this is for team profiles - teams created by user
      return action.payload.data
    default:
      return state
  }
}
