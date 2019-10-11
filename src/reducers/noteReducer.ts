import { Actions, Folders } from 'constants/enums'
import { NoteItem, NoteState, NotesActionTypes } from 'types'

const initialState: NoteState = {
  notes: [],
  activeFolder: 'ALL',
  activeNoteId: '',
  activeCategoryId: '',
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
        activeNoteId: action.payload.length > 0 ? action.payload[0].id : '',
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
        notes: [action.payload, ...state.notes],
      }
    case Actions.UPDATE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id
            ? {
                ...note,
                text: action.payload.text,
                lastUpdated: action.payload.lastUpdated,
              }
            : note
        ),
      }
    case Actions.TOGGLE_FAVORITE_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload
            ? {
                ...note,
                favorite: !note.favorite,
              }
            : note
        ),
      }
    case Actions.SEND_NOTE_TO_TRASH:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload
            ? {
                ...note,
                trash: true,
              }
            : note
        ),
        activeNoteId: getNewNoteId(state.notes, action.payload, state.activeCategoryId),
      }

    case Actions.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
        activeNoteId: getNewNoteId(state.notes, action.payload, state.activeCategoryId),
      }
    case Actions.SWAP_NOTE:
      return {
        ...state,
        activeNoteId: action.payload,
      }
    case Actions.SWAP_CATEGORY:
      return {
        ...state,
        activeCategoryId: action.payload,
        activeFolder: Folders.CATEGORY,
        activeNoteId: getFirstNote(Folders.CATEGORY, state.notes, action.payload),
      }
    case Actions.SWAP_FOLDER:
      return {
        ...state,
        activeFolder: action.payload,
        activeCategoryId: '',
        activeNoteId: getFirstNote(action.payload, state.notes),
      }
    case Actions.PRUNE_NOTES:
      return {
        ...state,
        notes: state.notes.filter(note => note.text !== '' || note.id === state.activeNoteId),
      }
    case Actions.PRUNE_CATEGORY_FROM_NOTES:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.category === action.payload
            ? {
                ...note,
                category: undefined,
              }
            : note
        ),
      }
    case Actions.ADD_CATEGORY_TO_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.noteId
            ? {
                ...note,
                category: action.payload.categoryId,
              }
            : note
        ),
      }

    default:
      return state
  }
}

export default noteReducer

export function getFirstNote(folder: string, notes: NoteItem[], categoryId?: string): string {
  const notesNotTrash = notes.filter(note => !note.trash)

  switch (folder) {
    case Folders.CATEGORY:
      return notesNotTrash.find(note => note.category === categoryId)
        ? notesNotTrash.find(note => note.category === categoryId)!.id
        : ''
    case Folders.ALL:
      return notesNotTrash.length > 0 ? notesNotTrash[0].id : ''
    case Folders.TRASH:
      return notes.find(note => note.trash) ? notes.find(note => note.trash)!.id : ''
    default:
      return ''
  }
}

function getNewNoteId(notes: NoteItem[], oldNoteId: string, activeCategoryId: string): string {
  const notesNotTrash = activeCategoryId
    ? notes.filter(note => !note.trash && note.category === activeCategoryId)
    : notes.filter(note => !note.trash)
  const deletedNoteIndex = notesNotTrash.findIndex(note => note.id === oldNoteId)

  let newActiveNoteId = ''
  if (deletedNoteIndex === 0 && notesNotTrash[1]) {
    newActiveNoteId = notesNotTrash[deletedNoteIndex + 1].id
  } else if (notesNotTrash[deletedNoteIndex - 1]) {
    newActiveNoteId = notesNotTrash[deletedNoteIndex - 1].id
  }

  return newActiveNoteId
}
