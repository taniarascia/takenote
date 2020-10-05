import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Folder } from '@/utils/enums'
import { NoteItem, NoteState } from '@/types'

const getNewActiveNoteId = (
  notes: NoteItem[],
  oldNoteId: string,
  activeCategoryId: string,
  activeFolder: Folder
): string => {
  const newActiveNotes = notes
    .filter((note) => !note.scratchpad) // filter out all scratchpad notes
    .filter((note) => (activeFolder !== Folder.TRASH ? !note.trash : note.trash)) // trash or not trash
    .filter((note) => (activeCategoryId ? note.category === activeCategoryId : true)) // filter category if necessary
  const trashedNoteIndex = newActiveNotes.findIndex((note) => note.id === oldNoteId)

  if (trashedNoteIndex === 0 && newActiveNotes[1]) return newActiveNotes[1].id
  if (newActiveNotes[trashedNoteIndex - 1]) return newActiveNotes[trashedNoteIndex - 1].id

  return ''
}

export const getFirstNoteId = (folder: Folder, notes: NoteItem[], categoryId?: string): string => {
  const notesNotTrash = notes.filter((note) => !note.trash)
  const firstNote = {
    [Folder.ALL]: () => notesNotTrash.find((note) => !note.scratchpad),
    [Folder.CATEGORY]: () => notesNotTrash.find((note) => note.category === categoryId),
    [Folder.FAVORITES]: () => notesNotTrash.find((note) => note.favorite),
    [Folder.SCRATCHPAD]: () => notesNotTrash.find((note) => note.scratchpad),
    [Folder.TRASH]: () => notes.find((note) => note.trash),
  }[folder]()
  return firstNote ? firstNote.id : ''
}

const initialState: NoteState = {
  activeCategoryId: '',
  activeFolder: Folder.ALL,
  activeNoteId: '',
  selectedNotesIds: [],
  error: '',
  loading: true,
  notes: [],
  searchValue: '',
}

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addCategoryToNote: (
      state,
      { payload }: PayloadAction<{ categoryId: string; noteId: string }>
    ) => ({
      ...state,
      notes: state.selectedNotesIds.includes(payload.noteId)
        ? state.notes.map((note) =>
            state.selectedNotesIds.includes(note.id)
              ? { ...note, category: payload.categoryId }
              : note
          )
        : state.notes.map((note) =>
            note.id === payload.noteId ? { ...note, category: payload.categoryId } : note
          ),
    }),
    addNote: (state, { payload }: PayloadAction<NoteItem>) => ({
      ...state,
      notes: [...state.notes, payload],
    }),
    deleteNotes: (state, { payload }: PayloadAction<string[]>) => ({
      ...state,
      notes: state.notes.filter((note) => !payload.includes(note.id)),
      activeNoteId: getNewActiveNoteId(
        state.notes,
        state.activeNoteId,
        state.activeCategoryId,
        state.activeFolder
      ),
      selectedNotesIds: [
        getNewActiveNoteId(
          state.notes,
          state.activeNoteId,
          state.activeCategoryId,
          state.activeFolder
        ),
      ],
    }),
    emptyTrash: (state) => ({
      ...state,
      notes: state.notes.filter((note) => !note.trash),
    }),
    loadNotes: () => initialState,
    loadNotesError: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: payload,
    }),
    loadNotesSuccess: (state, { payload }: PayloadAction<NoteItem[]>) => ({
      ...state,
      notes: payload,
      activeNoteId: getFirstNoteId(Folder.ALL, payload),
      selectedNotesIds: [getFirstNoteId(Folder.ALL, payload)],
      loading: false,
    }),
    pruneNotes: (state) => ({
      ...state,
      notes: state.notes.filter(
        (note) => note.text !== '' || state.selectedNotesIds.includes(note.id)
      ),
    }),
    searchNotes: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      searchValue: payload,
    }),
    updateActiveCategoryId: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      activeCategoryId: payload,
      activeFolder: Folder.CATEGORY,
      activeNoteId: getFirstNoteId(Folder.CATEGORY, state.notes, payload),
      selectedNotesIds: [getFirstNoteId(Folder.CATEGORY, state.notes, payload)],
    }),
    swapFolder: (state, { payload }: PayloadAction<Folder>) => ({
      ...state,
      activeFolder: payload,
      activeCategoryId: '',
      activeNoteId: getFirstNoteId(payload, state.notes),
      selectedNotesIds: [getFirstNoteId(payload, state.notes)],
    }),
    updateActiveNote: (
      state,
      { payload }: PayloadAction<{ noteId?: string; multiSelect: boolean }>
    ) => ({
      ...state,
      activeNoteId: payload.multiSelect
        ? state.notes.filter(({ id }) => state.selectedNotesIds.includes(id)).slice(-1)[0].id
        : payload.noteId!,
    }),
    toggleFavoriteNote: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      notes: state.selectedNotesIds.includes(payload)
        ? state.notes.map((note) =>
            state.selectedNotesIds.includes(note.id) ? { ...note, favorite: !note.favorite } : note
          )
        : state.notes.map((note) =>
            note.id === payload ? { ...note, favorite: !note.favorite } : note
          ),
    }),
    restoreTrashedNote: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      notes: state.selectedNotesIds.includes(payload)
        ? state.notes.map((note) =>
            state.selectedNotesIds.includes(note.id) && note.trash
              ? { ...note, trash: !note.trash }
              : note
          )
        : state.notes.map((note) => note),
    }),
    toggleTrashedNote: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      notes: state.selectedNotesIds.includes(payload)
        ? state.notes.map((note) =>
            state.selectedNotesIds.includes(note.id) ? { ...note, trash: !note.trash } : note
          )
        : state.notes.map((note) => (note.id === payload ? { ...note, trash: !note.trash } : note)),
      activeNoteId: getNewActiveNoteId(
        state.notes,
        payload,
        state.activeCategoryId,
        state.activeFolder
      ),
      selectedNotesIds: [
        getNewActiveNoteId(state.notes, payload, state.activeCategoryId, state.activeFolder),
      ],
    }),
    addFavoriteNote: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      notes: state.notes.map((note) => {
        if (state.selectedNotesIds.includes(payload)) {
          return state.selectedNotesIds.includes(note.id) ? { ...note, favorite: true } : note
        }
        if (note.id === payload) {
          return { ...note, favorite: true }
        }

        return note
      }),
    }),
    addTrashedNote: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      notes: state.notes.map((note) => {
        if (state.selectedNotesIds.includes(payload)) {
          return state.selectedNotesIds.includes(note.id) ? { ...note, trash: true } : note
        }
        if (note.id === payload) {
          return { ...note, trash: true }
        }

        return note
      }),
      activeNoteId: getNewActiveNoteId(
        state.notes,
        payload,
        state.activeCategoryId,
        state.activeFolder
      ),
      selectedNotesIds: [
        getNewActiveNoteId(state.notes, payload, state.activeCategoryId, state.activeFolder),
      ],
    }),
    updateNote: (state, { payload }: PayloadAction<NoteItem>) => ({
      ...state,
      notes: state.notes.map((note) =>
        note.id === payload.id
          ? { ...note, text: payload.text, lastUpdated: payload.lastUpdated }
          : note
      ),
    }),
    updateSelectedNotes: (
      state,
      { payload: { noteId, multiSelect } }: PayloadAction<{ noteId: string; multiSelect: boolean }>
    ) => ({
      ...state,
      selectedNotesIds: multiSelect
        ? state.selectedNotesIds.length === 1 && state.selectedNotesIds[0] === noteId
          ? state.selectedNotesIds
          : state.selectedNotesIds.includes(noteId)
          ? state.selectedNotesIds.filter((selectedNoteId) => selectedNoteId !== noteId)
          : [...state.selectedNotesIds, noteId]
        : [noteId],
    }),
  },
})

export const {
  addCategoryToNote,
  addNote,
  deleteNotes,
  emptyTrash,
  loadNotes,
  loadNotesError,
  loadNotesSuccess,
  pruneNotes,
  searchNotes,
  updateActiveCategoryId,
  swapFolder,
  updateActiveNote,
  toggleFavoriteNote,
  toggleTrashedNote,
  addFavoriteNote,
  addTrashedNote,
  updateNote,
  updateSelectedNotes,
  restoreTrashedNote,
} = noteSlice.actions

export default noteSlice.reducer
