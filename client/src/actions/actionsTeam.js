import gts from '../apis/gts'

import { CREATE_TEAM, GET_TEAMS, GET_TEAM } from './types'

export const createTeam = (team, history) => async dispatch => {
  const res = await gts.post('/teams', team)
  history.push('/teams')
  dispatch({ type: CREATE_TEAM, payload: res })
}

export const getTeams = () => async dispatch => {
  const res = await gts.get('/v2/teams')
  dispatch({ type: GET_TEAMS, payload: res })
}

export const getTeam = id => async dispatch => {
  const res = await gts.get(`/v2/teams/${id}`)
  dispatch({ type: GET_TEAM, payload: res })
}
