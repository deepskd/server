import gts from '../apis/gts'
import { ORDER_STATS } from '../actions/types'

export const getOrderStats = (
  country = 'US',
  retailerType,
  activePage
) => async dispatch => {
  let query = `country=${country}`
  if (retailerType) {
    query += `&retailerType=${retailerType}`
  }
  if (activePage) {
    query += `&activePage=${activePage}`
  }
  const res = await gts.get(`/orderStats?${query}`)
  dispatch({ type: ORDER_STATS, payload: res })
}
