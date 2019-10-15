import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'
import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'

import rootSaga from 'sagas'
import rootReducer from 'slices'

interface RenderWithRouterOptions {
  route: string
  history: MemoryHistory
}

export const renderWithRouter = (
  ui: ReactNode,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  }: RenderWithRouterOptions = {} as RenderWithRouterOptions
) => {
  const sagaMiddleware = createSagaMiddleware()

  const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })],
  })

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
