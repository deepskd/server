import { FIND_TEAMS, ASSIGN_IMAGES_TO_TEAM } from '../actions/types'

export default (state = [], action) => {
  switch (action.type) {
    case FIND_TEAMS:
      return action.payload.data
    case ASSIGN_IMAGES_TO_TEAM:
      return []
    default:
      return state
  }
}
