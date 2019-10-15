import { createSlice, Slice } from 'redux-starter-kit'

import { ThemeState } from 'types'

const initialState: ThemeState = {
  dark: false,
}

const themeSlice: Slice<ThemeState> = createSlice({
  slice: 'theme',
  initialState,
  reducers: {
    toggleDarkTheme: state => ({
      ...state,
      dark: !state.dark,
    }),
  },
})

export const { toggleDarkTheme } = themeSlice.actions

export default themeSlice.reducer
