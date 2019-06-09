import gts from '../apis/gts'
import { FIND_ORDERS } from './types'

export const findOrder = ({
  orderName,
  retailerId,
  article,
}) => async dispatch => {
  const query = `orderName=${orderName}&retailerId=${retailerId}&article=${article}`

  const res = await gts.get(`/orders?${query}`)
  dispatch({ type: FIND_ORDERS, payload: res.data })
}

export const assignOrdersToTeam = data => async dispatch => {
  const res = await gts.patch('/orders', data)
  console.log(`${res} records updated`)
  dispatch({ type: FIND_ORDERS, payload: [] })
}
