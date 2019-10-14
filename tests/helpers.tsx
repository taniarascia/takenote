import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import rootReducer from '../src/reducers'
import rootSaga from '../src/sagas'

export const renderWithRouter = (
  ui: ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route: string; history: MemoryHistory } = {} as { route: string; history: MemoryHistory }
) => {
  const sagaMiddleware = createSagaMiddleware()

  const store = createStore(rootReducer, {}, compose(applyMiddleware(sagaMiddleware)))

  sagaMiddleware.run(rootSaga)

  return {
    ...render(
      <Provider store={store}>
        <MemoryRouter>{ui}</MemoryRouter>
      </Provider>
    ),
    history,
  }
}
