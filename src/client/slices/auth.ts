import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { AuthState } from '@/types'

const initialState: AuthState = {
  loading: true,
  currentUser: {},
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authenticateUser: state => ({
      ...state,
      loading: true,
    }),
    authenticateUserSuccess: (state, { payload }: PayloadAction<any>) => ({
      ...state,
      currentUser: payload,
      isAuthenticated: true,
      loading: false,
    }),
    authenticateUserError: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      error: payload,
      isAuthenticated: false,
      loading: false,
    }),
  },
})

export const {
  authenticateUser,
  authenticateUserSuccess,
  authenticateUserError,
} = authSlice.actions

export default authSlice.reducer
