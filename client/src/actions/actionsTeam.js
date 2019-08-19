import gts from '../apis/gts'

import { CREATE_TEAM, GET_TEAMS } from './types'

export const createTeam = (team, history) => async dispatch => {
  const res = await gts.post('/teams', team)
  history.push('/teams')
  dispatch({ type: CREATE_TEAM, payload: res })
}

export const getTeams = id => async dispatch => {
  let endpoint = id ? `/v2/teams/${id}` : `/v2/teams`
  const res = await gts.get(endpoint)
  dispatch({ type: GET_TEAMS, payload: res })
}
