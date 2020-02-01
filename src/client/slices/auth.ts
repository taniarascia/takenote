import { createSlice } from '@reduxjs/toolkit'

import { AuthState } from '@/types'

const initialState: AuthState = {
  isAuthenticated: true, // should be false, just bypassing auth for now
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: state => ({
      ...state,
      isAuthenticated: true,
    }),
  },
})

export const { login } = authSlice.actions

export default authSlice.reducer
