import uuid from 'uuid/v4'
import { ADD_NOTE, UPDATE_NOTE } from '../constants/actionTypes'
import { initialState } from '../constants/fakeState'

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return [...state, { id: uuid(), text: action.payload, created: '', lastUpdated: '' }]
    case UPDATE_NOTE:
      return state.map(note =>
        note.id === action.payload.id
          ? {
              id: action.payload.id,
              text: action.payload.text,
              created: action.payload.created,
              lastUpdated: '',
            }
          : note
      )
    default:
      return state
  }
}

export default noteReducer
