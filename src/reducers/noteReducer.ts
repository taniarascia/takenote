import { Actions } from 'constants/enums'
import { NoteState, NotesActionTypes } from 'types'

const initialState: NoteState = {
  notes: [],
  active: '',
  error: '',
  loading: true,
}

const noteReducer = (state = initialState, action: NotesActionTypes): NoteState => {
  switch (action.type) {
    case Actions.LOAD_NOTES:
      return initialState
    case Actions.LOAD_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        active: action.payload.length > 0 ? action.payload[0].id : '',
        loading: false,
      }
    case Actions.LOAD_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case Actions.ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      }
    case Actions.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
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
    case Actions.DELETE_NOTE:
      const deletedNoteIndex = state.notes.findIndex(note => note.id === action.payload)
      let newActiveNoteId = ''

      if (deletedNoteIndex === 0 && state.notes[1]) {
        newActiveNoteId = state.notes[deletedNoteIndex + 1].id
      } else if (state.notes[deletedNoteIndex - 1]) {
        newActiveNoteId = state.notes[deletedNoteIndex - 1].id
      }

      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
        active: newActiveNoteId,
      }
    case Actions.SWAP_NOTE:
      return {
        ...state,
        active: action.payload,
      }
    case Actions.PRUNE_NOTES:
      return {
        ...state,
        notes: state.notes.filter(note => note.text !== '' || note.id === state.active),
      }
    default:
      return state
  }
}

export default noteReducer
