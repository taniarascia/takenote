import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'
import createSagaMiddleware from 'redux-saga'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import { App } from '@/containers/App'
import rootSaga from '@/sagas'
import rootReducer from '@/slices'
import history from '@/utils/history'

import '@/styles/index.scss'
import { toggleDarkTheme, updateCodeMirrorOption } from './slices/settings'

const sagaMiddleware = createSagaMiddleware()
const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware, ...getDefaultMiddleware({ thunk: false })],
  devTools: process.env.NODE_ENV !== 'production',
})

const { darkTheme } = store.getState().settingsState

if (!darkTheme) {
  if (typeof window !== 'undefined') {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      store.dispatch(toggleDarkTheme())
      store.dispatch(updateCodeMirrorOption({ key: 'theme', value: 'new-moon' }))
    }
  }
}

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
