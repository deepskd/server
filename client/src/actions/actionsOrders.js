import gts from '../apis/gts'
import { FIND_ORDERS } from './types'

export const findOrder = orderName => async dispatch => {
  const res = await gts.get(`/orders?orderName=${orderName}`)
  dispatch({ type: FIND_ORDERS, payload: res.data })
}

export const assignOrdersToTeam = data => async dispatch => {
  const res = await gts.patch('/orders', data)
  console.log(`${res} records updated`)
  dispatch({ type: FIND_ORDERS, payload: [] })
}
