import { Action, Folder } from 'constants/enums'
import { NoteItem, NotesActionTypes, NoteState } from 'types'
import { sortByLastUpdated } from 'helpers'

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
    case Action.LOAD_NOTES:
      return initialState
    case Action.LOAD_NOTES_SUCCESS:
      return {
        ...state,
        notes: action.payload,
        activeNoteId: getFirstNote(Folder.ALL, action.payload),
        loading: false,
      }
    case Action.LOAD_NOTES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case Action.ADD_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      }
    case Action.UPDATE_NOTE:
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
    case Action.TOGGLE_FAVORITE_NOTE:
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
    case Action.TOGGLE_TRASHED_NOTE:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload
            ? {
                ...note,
                trash: !note.trash,
              }
            : note
        ),
        activeNoteId: getNewNoteId(state.notes, action.payload, state.activeCategoryId),
      }
    case Action.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter(note => note.id !== action.payload),
        activeNoteId: getNewNoteId(state.notes, action.payload, state.activeCategoryId),
      }
    case Action.SWAP_NOTE:
      return {
        ...state,
        activeNoteId: action.payload,
      }
    case Action.SWAP_CATEGORY:
      return {
        ...state,
        activeCategoryId: action.payload,
        activeFolder: Folder.CATEGORY,
        activeNoteId: getFirstNote(Folder.CATEGORY, state.notes, action.payload),
      }
    case Action.SWAP_FOLDER:
      return {
        ...state,
        activeFolder: action.payload,
        activeCategoryId: '',
        activeNoteId: getFirstNote(action.payload, state.notes),
      }
    case Action.PRUNE_NOTES:
      return {
        ...state,
        notes: state.notes.filter(note => note.text !== '' || note.id === state.activeNoteId),
      }
    case Action.PRUNE_CATEGORY_FROM_NOTES:
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
    case Action.ADD_CATEGORY_TO_NOTE:
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
  const notesNotTrash = notes.filter(note => !note.trash).sort(sortByLastUpdated)
  const firstNoteCategory = notesNotTrash.find(note => note.category === categoryId)
  const firstNoteFavorite = notesNotTrash.find(note => note.favorite)
  const firstNoteTrash = notes.find(note => note.trash)

  switch (folder) {
    case Folder.CATEGORY:
      return firstNoteCategory ? firstNoteCategory.id : ''
    case Folder.FAVORITES:
      return firstNoteFavorite ? firstNoteFavorite.id : ''
    case Folder.TRASH:
      return firstNoteTrash ? firstNoteTrash.id : ''
    case Folder.ALL:
      return notesNotTrash.length > 0 ? notesNotTrash[0].id : ''
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
