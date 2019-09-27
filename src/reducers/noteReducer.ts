import { ActionType } from 'constants/enums'
import { initialState } from 'constants/fakeState'

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.ADD_NOTE:
      return [...state, action.payload]
    case ActionType.UPDATE_NOTE:
      return state.map(note =>
        note.id === action.payload.id
          ? {
              id: note.id,
              text: action.payload.text,
              created: note.created,
              lastUpdated: 'new-value',
            }
          : note
      )
    default:
      return state
  }
}

export default noteReducer
