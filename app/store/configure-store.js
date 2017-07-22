import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import reducer from '../reducers'
import * as firebase from '../utils/Firebase'

const thunkMiddleware = thunk.withExtraArgument(firebase)
const loggerMiddleware = createLogger()

const middleware = [
  thunkMiddleware,
  loggerMiddleware
]

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore)

export default (initialState = {}) => {
    return createStoreWithMiddleware(reducer, initialState)
}