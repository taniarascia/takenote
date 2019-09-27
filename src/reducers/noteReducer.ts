import { ActionType } from 'constants/enums'
import { NoteItem } from 'types'

const initialState = {
  data: [] as NoteItem[],
  active: null,
  loading: true,
  error: null,
}

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_NOTES:
      return state
    case ActionType.LOAD_NOTES_SUCCESS:
      return {
        ...state,
        data: action.payload,
        active: action.payload[0].id,
        loading: false,
      }
    case ActionType.LOAD_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ActionType.SWAP_NOTE:
      return {
        ...state,
        active: action.payload,
      }
    case ActionType.ADD_NOTE:
      return {
        ...state,
        data: [...state.data, action.payload],
      }
    case ActionType.UPDATE_NOTE:
      return {
        ...state,
        data: state.data.map(note =>
          note.id === action.payload.id
            ? {
                id: note.id,
                text: action.payload.text,
                created: '',
                lastUpdated: '',
              }
            : note
        ),
      }
    case ActionType.DELETE_NOTE:
      return {
        ...state,
        data: state.data.filter(note => note.id !== action.payload),
        active: state.data[0].id,
      }
    default:
      return state
  }
}

export default noteReducer
