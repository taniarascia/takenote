import { createSlice, Slice, PayloadAction } from 'redux-starter-kit'

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
    loadTheme: () => initialState,
    loadThemeError: state => ({
      ...state,
    }),
    loadThemeSuccess: (_, { payload }: PayloadAction<ThemeState>) => ({
      ...payload,
    }),
  },
})

export const { toggleDarkTheme, loadTheme, loadThemeError, loadThemeSuccess } = themeSlice.actions

export default themeSlice.reducer
