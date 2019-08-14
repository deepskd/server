import gts from '../apis/gts'

import { CREATE_TEAM } from './types'

export const createTeam = team => async dispatch => {
  const res = await gts.post('/teams', team)
  dispatch({ type: CREATE_TEAM, payload: res })
}
