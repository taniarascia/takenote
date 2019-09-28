import { ActionType } from 'constants/enums'
import { NoteState } from 'types'

const initialState: NoteState = {
  data: [],
  active: '',
  error: '',
  loading: true,
}

const noteReducer = (state = initialState, action): NoteState => {
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
    case ActionType.PRUNE_NOTES:
      return {
        ...state,
        data: state.data.filter(note => note.text !== ''),
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
      const deletedNoteIndex = state.data.findIndex(note => note.id === action.payload)
      let newActiveNoteId: string

      if (deletedNoteIndex === 0) {
        if (state.data.find((note, i) => i === 1)) {
          newActiveNoteId = state.data[deletedNoteIndex + 1].id
        } else {
          newActiveNoteId = ''
        }
      } else if (state.data[deletedNoteIndex - 1]) {
        newActiveNoteId = state.data[deletedNoteIndex - 1].id
      } else {
        newActiveNoteId = ''
      }

      return {
        ...state,
        data: state.data.filter(note => note.id !== action.payload),
        active: newActiveNoteId,
      }
    default:
      return state
  }
}

export default noteReducer
