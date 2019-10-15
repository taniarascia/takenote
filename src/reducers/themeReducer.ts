import { Action } from 'constants/enums'
import { ThemeState, ThemeActionTypes } from 'types'

const initialState: ThemeState = {
  dark: false,
}

const themeReducer = (state = initialState, action: ThemeActionTypes): ThemeState => {
  switch (action.type) {
    case Action.TOGGLE_DARK_THEME:
      return {
        ...state,
        dark: !state.dark,
      }

    default:
      return state
  }
}

export default themeReducer
