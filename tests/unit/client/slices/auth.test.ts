import { PayloadAction } from '@reduxjs/toolkit'

import reducer, {
  initialState,
  login,
  loginError,
  loginSuccess,
  logout,
  logoutSuccess,
} from '@/slices/auth'

describe('authSlice', () => {
  it('should return the initial state on first run', () => {
    const nextState = initialState
    const action = {} as PayloadAction
    const result = reducer(undefined, action)

    expect(result).toEqual(nextState)
  })

  it('should set the loading true on login', () => {
    const nextState = { ...initialState, loading: true }

    const result = reducer(initialState, login())

    expect(result).toEqual(nextState)
  })

  it('should set the currentUser to payload, isAuthenticated to true and loading to false on loginSuccess', () => {
    const payload = { currentUserName: 'test' }
    const nextState = {
      ...initialState,
      loading: false,
      isAuthenticated: true,
      currentUser: payload,
    }

    const result = reducer(initialState, loginSuccess(payload))

    expect(result).toEqual(nextState)
  })

  it('should set the error to payload, isAuthenticated to false and loading to false on loginError', () => {
    const payload = 'error text'
    const nextState = {
      ...initialState,
      loading: false,
      isAuthenticated: false,
      error: payload,
    }

    const result = reducer(initialState, loginError(payload))

    expect(result).toEqual(nextState)
  })

  it('should set the loading true on logout', () => {
    const nextState = { ...initialState, loading: true }

    const result = reducer(initialState, logout())

    expect(result).toEqual(nextState)
  })

  it('should set isAuthenticated to false, currentUser to empty object and loading to false on logoutSuccess', () => {
    const initialStateBeforeLogout = {
      isAuthenticated: true,
      loading: false,
      currentUser: { name: 'test' },
      error: '',
    }

    const nextState = {
      ...initialState,
      loading: false,
    }

    const result = reducer(initialStateBeforeLogout, logoutSuccess())

    expect(result).toEqual(nextState)
  })
})
