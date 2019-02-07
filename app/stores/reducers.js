import { combineReducers } from 'redux'
import questionReducer from './question/reducer'

export default combineReducers({
  question: questionReducer
})