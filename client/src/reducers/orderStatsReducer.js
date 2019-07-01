import { ORDER_STATS } from '../actions/types'

export default function(state = [], action) {
  switch (action.type) {
    case ORDER_STATS:
      return action.payload.data
    default:
      return state
  }
}
