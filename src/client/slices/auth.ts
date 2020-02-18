import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState } from '@/types'

const initialState: AuthState = {
  loading: true,
  currentUser: {},
  isAuthenticated: false,
  error: '',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => ({
      ...state,
      loading: true,
    }),
    loginSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      currentUser: payload,
      isAuthenticated: true,
      loading: false,
    }),
    loginError: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      error: payload,
      isAuthenticated: false,
      loading: false,
    }),
    logout: state => ({
      ...state,
      loading: true,
    }),
    logoutSuccess: state => ({
      ...state,
      isAuthenticated: false,
      currentUser: {},
      error: '',
      loading: false,
    }),
  },
})

export const { login, loginSuccess, loginError, logout, logoutSuccess } = authSlice.actions

export default authSlice.reducer
