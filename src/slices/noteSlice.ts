import { createSlice } from 'redux-starter-kit'

import { Folder } from 'constants/enums'
import { sortByLastUpdated } from 'helpers'
import { NoteItem, NoteState } from 'types'

// TODO: Ugh
const getNewActiveNoteId = (
  notes: NoteItem[],
  oldNoteId: string,
  activeCategoryId: string
): string => {
  const notesNotTrash = notes.filter(note =>
    activeCategoryId ? !note.trash && note.category === activeCategoryId : !note.trash
  )
  const trashedNoteIndex = notesNotTrash.findIndex(note => note.id === oldNoteId)

  if (trashedNoteIndex === 0 && notesNotTrash[1]) return notesNotTrash[1].id
  if (notesNotTrash[trashedNoteIndex - 1]) return notesNotTrash[trashedNoteIndex - 1].id
  return ''
}

export const getFirstNoteId = (folder: Folder, notes: NoteItem[], categoryId?: string): string => {
  const notesNotTrash = notes.filter(note => !note.trash).sort(sortByLastUpdated)
  const firstNote = {
    [Folder.ALL]: () => notesNotTrash[0],
    [Folder.CATEGORY]: () => notesNotTrash.find(note => note.category === categoryId),
    [Folder.FAVORITES]: () => notesNotTrash.find(note => note.favorite),
    [Folder.TRASH]: () => notes.find(note => note.trash),
  }[folder]()
  return firstNote ? firstNote.id : ''
}

const initialState: NoteState = {
  activeCategoryId: '',
  activeFolder: Folder.ALL,
  activeNoteId: '',
  error: '',
  loading: true,
  notes: [],
}

const noteSlice = createSlice({
  slice: 'note',
  initialState,
  reducers: {
    addCategoryToNote: (state, { payload }) => ({
      ...state,
      notes: state.notes.map(note =>
        note.id === payload.noteId
          ? {
              ...note,
              category: payload.categoryId,
            }
          : note
      ),
    }),
    addNote: (state, { payload }) => ({
      ...state,
      notes: [...state.notes, payload],
    }),
    deleteNote: (state, { payload }) => ({
      ...state,
      notes: state.notes.filter(note => note.id !== payload),
      activeNoteId: getNewActiveNoteId(state.notes, payload, state.activeCategoryId),
    }),
    loadNotes: () => initialState,
    loadNotesError: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
    loadNotesSuccess: (state, { payload }) => ({
      ...state,
      notes: payload,
      activeNoteId: getFirstNoteId(Folder.ALL, payload),
      loading: false,
    }),
    pruneCategoryFromNotes: (state, { payload }) => ({
      ...state,
      notes: state.notes.map(note =>
        note.category === payload
          ? {
              ...note,
              category: undefined,
            }
          : note
      ),
    }),
    pruneNotes: state => ({
      ...state,
      notes: state.notes.filter(note => note.text !== '' || note.id === state.activeNoteId),
    }),
    swapCategory: (state, { payload }) => ({
      ...state,
      activeCategoryId: payload,
      activeFolder: Folder.CATEGORY,
      activeNoteId: getFirstNoteId(Folder.CATEGORY, state.notes, payload),
    }),
    swapFolder: (state, { payload }) => ({
      ...state,
      activeFolder: payload,
      activeCategoryId: '',
      activeNoteId: getFirstNoteId(payload, state.notes),
    }),
    swapNote: (state, { payload }) => ({
      ...state,
      activeNoteId: payload,
    }),
    toggleFavoriteNote: (state, { payload }) => ({
      ...state,
      notes: state.notes.map(note =>
        note.id === payload ? { ...note, favorite: !note.favorite } : note
      ),
    }),
    toggleTrashedNote: (state, { payload }) => ({
      ...state,
      notes: state.notes.map(note =>
        note.id === payload ? { ...note, trash: !note.trash } : note
      ),
      activeNoteId: getNewActiveNoteId(state.notes, payload, state.activeCategoryId),
    }),
    updateNote: (state, { payload }) => ({
      ...state,
      notes: state.notes.map(note =>
        note.id === payload.id
          ? {
              ...note,
              text: payload.text,
              lastUpdated: payload.lastUpdated,
            }
          : note
      ),
    }),
  },
})

export const {
  addCategoryToNote,
  addNote,
  deleteNote,
  loadNotes,
  loadNotesError,
  loadNotesSuccess,
  pruneCategoryFromNotes,
  pruneNotes,
  swapCategory,
  swapFolder,
  swapNote,
  toggleFavoriteNote,
  toggleTrashedNote,
  updateNote,
} = noteSlice.actions

export default noteSlice.reducer
