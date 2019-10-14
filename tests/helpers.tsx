import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { createMemoryHistory, MemoryHistory } from 'history'
import { MemoryRouter } from 'react-router-dom'
import { render } from '@testing-library/react'
import createSagaMiddleware from 'redux-saga'

import rootReducer from 'reducers'
import rootSaga from 'sagas'

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
