import { createStore, compose, applyMiddleware } from 'redux'
import { logger } from '../helpers'
import rootReducer from '../reducers'

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(logger),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
