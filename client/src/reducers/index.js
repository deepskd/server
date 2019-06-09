import { combineReducers } from 'redux'
import teamsReducer from './teamsReducer'
import teamProductsReducer from './teamProductsReducer'
import imageStatsReducer from './imageStatsReducer'
import imagesReducer from './imagesReducer'
import authReducer from './authReducer'
import ordersReducer from './ordersReducer'

export default combineReducers({
  teams: teamsReducer,
  teamProducts: teamProductsReducer,
  imageStats: imageStatsReducer,
  images: imagesReducer,
  auth: authReducer,
  orders: ordersReducer,
})
