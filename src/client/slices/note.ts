import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Folder } from '@/utils/enums'
import { NoteItem, NoteState } from '@/types'
import { isDraftNote } from '@/utils/helpers'

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
  const availableNotes = notes.filter((note) => !note.trash)

  const firstNote = {
    [Folder.ALL]: () => availableNotes.find((note) => !note.scratchpad),
    [Folder.CATEGORY]: () => availableNotes.find((note) => note.category === categoryId),
    [Folder.FAVORITES]: () => availableNotes.find((note) => note.favorite),
    [Folder.SCRATCHPAD]: () => availableNotes.find((note) => note.scratchpad),
    [Folder.TRASH]: () => notes.find((note) => note.trash),
  }[folder]()

  return firstNote ? firstNote.id : ''
}

const initialState: NoteState = {
  notes: [],
  activeCategoryId: '',
  activeFolder: Folder.ALL,
  activeNoteId: '',
  selectedNotesIds: [],
  searchValue: '',
  error: '',
  loading: true,
}

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, { payload }: PayloadAction<NoteItem>) => {
      const draftNote = state.notes.find((note) => isDraftNote(note))

      if (!draftNote) {
        state.notes.push(payload)
      }
    },

    updateNote: (state, { payload }: PayloadAction<NoteItem>) => {
      state.notes = state.notes.map((note) =>
        note.id === payload.id
          ? { ...note, text: payload.text, lastUpdated: payload.lastUpdated }
          : note
      )
    },

    deleteNotes: (state, { payload }: PayloadAction<string[]>) => {
      state.notes = state.notes.filter((note) => !payload.includes(note.id))
      state.activeNoteId = getNewActiveNoteId(
        state.notes,
        state.activeNoteId,
        state.activeCategoryId,
        state.activeFolder
      )
      state.selectedNotesIds = [
        getNewActiveNoteId(
          state.notes,
          state.activeNoteId,
          state.activeCategoryId,
          state.activeFolder
        ),
      ]
    },

    addCategoryToNote: (
      state,
      { payload }: PayloadAction<{ categoryId: string; noteId: string }>
    ) => {
      state.notes = state.selectedNotesIds.includes(payload.noteId)
        ? // Multi
          state.notes.map((note) =>
            state.selectedNotesIds.includes(note.id)
              ? { ...note, category: payload.categoryId }
              : note
          )
        : // Single
          state.notes.map((note) =>
            note.id === payload.noteId ? { ...note, category: payload.categoryId } : note
          )
    },

    updateActiveNote: (
      state,
      { payload: { noteId, multiSelect } }: PayloadAction<{ noteId: string; multiSelect: boolean }>
    ) => {
      state.activeNoteId = multiSelect
        ? state.notes.filter(({ id }) => state.selectedNotesIds.includes(id)).slice(-1)[0].id
        : noteId!
    },

    updateActiveCategoryId: (state, { payload }: PayloadAction<string>) => {
      state.activeCategoryId = payload
      state.activeFolder = Folder.CATEGORY
      state.activeNoteId = getFirstNoteId(Folder.CATEGORY, state.notes, payload)
      state.selectedNotesIds = [getFirstNoteId(Folder.CATEGORY, state.notes, payload)]
      state.notes = state.notes.filter((note) => note.text !== '')
    },

    swapFolder: (state, { payload }: PayloadAction<Folder>) => {
      state.activeFolder = payload
      state.activeCategoryId = ''
      state.activeNoteId = getFirstNoteId(payload, state.notes)
      state.selectedNotesIds = [getFirstNoteId(payload, state.notes)]
      state.notes = state.notes.filter((note) => note.text !== '')
    },

    assignFavoriteToNotes: (state, { payload }: PayloadAction<string>) => {
      state.notes = state.notes.map((note) => {
        if (state.selectedNotesIds.includes(payload)) {
          return state.selectedNotesIds.includes(note.id) ? { ...note, favorite: true } : note
        }
        if (note.id === payload) {
          return { ...note, favorite: true }
        }

        return note
      })
    },

    toggleFavoriteNotes: (state, { payload }: PayloadAction<string>) => {
      state.notes = state.selectedNotesIds.includes(payload)
        ? state.notes.map((note) =>
            state.selectedNotesIds.includes(note.id) ? { ...note, favorite: !note.favorite } : note
          )
        : state.notes.map((note) =>
            note.id === payload ? { ...note, favorite: !note.favorite } : note
          )
    },

    assignTrashToNotes: (state, { payload }: PayloadAction<string>) => {
      state.notes = state.notes.map((note) => {
        if (state.selectedNotesIds.includes(payload)) {
          return state.selectedNotesIds.includes(note.id) ? { ...note, trash: true } : note
        }
        if (note.id === payload) {
          return { ...note, trash: true }
        }

        return note
      })
      state.activeNoteId = getNewActiveNoteId(
        state.notes,
        payload,
        state.activeCategoryId,
        state.activeFolder
      )
      state.selectedNotesIds = [
        getNewActiveNoteId(state.notes, payload, state.activeCategoryId, state.activeFolder),
      ]
    },

    toggleTrashNotes: (state, { payload }: PayloadAction<string>) => {
      state.notes = state.selectedNotesIds.includes(payload)
        ? state.notes.map((note) =>
            state.selectedNotesIds.includes(note.id) ? { ...note, trash: !note.trash } : note
          )
        : state.notes.map((note) => (note.id === payload ? { ...note, trash: !note.trash } : note))
      state.activeNoteId = getNewActiveNoteId(
        state.notes,
        payload,
        state.activeCategoryId,
        state.activeFolder
      )
      state.selectedNotesIds = [
        getNewActiveNoteId(state.notes, payload, state.activeCategoryId, state.activeFolder),
      ]
    },

    unassignTrashFromNotes: (state, { payload }: PayloadAction<string>) => {
      state.notes = state.notes.map((note) => {
        if (state.selectedNotesIds.includes(payload)) {
          return state.selectedNotesIds.includes(note.id) && note.trash
            ? { ...note, trash: false }
            : note
        }
        if (note.id === payload) {
          return { ...note, trash: false }
        }

        return note
      })
    },

    updateSelectedNotes: (
      state,
      { payload: { noteId, multiSelect } }: PayloadAction<{ noteId: string; multiSelect: boolean }>
    ) => {
      state.selectedNotesIds = multiSelect
        ? state.selectedNotesIds.length === 1 && state.selectedNotesIds[0] === noteId
          ? state.selectedNotesIds
          : state.selectedNotesIds.includes(noteId)
          ? state.selectedNotesIds.filter((selectedNoteId) => selectedNoteId !== noteId)
          : [...state.selectedNotesIds, noteId]
        : [noteId]
    },

    permanentlyEmptyTrash: (state) => {
      state.notes = state.notes.filter((note) => !note.trash)
    },

    pruneNotes: (state) => {
      state.notes = state.notes.filter(
        (note) => note.text !== '' || state.selectedNotesIds.includes(note.id)
      )
    },

    searchNotes: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload
    },

    loadNotes: (state) => {
      state.loading = true
    },

    loadNotesError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false
      state.error = payload
    },

    loadNotesSuccess: (state, { payload }: PayloadAction<NoteItem[]>) => {
      state.notes = payload
      state.activeNoteId = getFirstNoteId(Folder.ALL, payload)
      state.selectedNotesIds = [getFirstNoteId(Folder.ALL, payload)]
      state.loading = false
    },
  },
})

export const {
  addNote,
  updateNote,
  deleteNotes,
  addCategoryToNote,
  updateActiveNote,
  updateActiveCategoryId,
  swapFolder,
  assignFavoriteToNotes,
  toggleFavoriteNotes,
  assignTrashToNotes,
  toggleTrashNotes,
  unassignTrashFromNotes,
  updateSelectedNotes,
  permanentlyEmptyTrash,
  pruneNotes,
  searchNotes,
  loadNotes,
  loadNotesError,
  loadNotesSuccess,
} = noteSlice.actions

export default noteSlice.reducer
