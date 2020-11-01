import { PayloadAction } from '@reduxjs/toolkit'
import dayjs from 'dayjs'

import reducer, {
  addNote,
  initialState,
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
} from '@/slices/note'
import { Folder } from '@/utils/enums'

function createNote({
  id,
  category,
  text,
  favorite,
  scratchpad,
  trash,
}: {
  id: string
  category?: string
  text?: string
  favorite?: boolean
  scratchpad?: boolean
  trash?: boolean
}) {
  return {
    id,
    text: text ?? `sample note - ${id}`,
    created: dayjs().format(),
    lastUpdated: dayjs().format(),
    category,
    favorite,
    scratchpad,
    trash,
  }
}

describe('noteSlice', () => {
  test('should return initial state on first run', () => {
    const nextState = initialState
    const action = {} as PayloadAction
    const result = reducer(undefined, action)

    expect(result).toEqual(nextState)
  })

  describe('addNote', () => {
    test('should add note if there are no notes in draft state on addNote', () => {
      const payload = createNote({ id: '1', category: '1' })
      const nextState = { ...initialState, notes: [payload] }
      const result = reducer(initialState, addNote(payload))

      expect(result).toEqual(nextState)
    })

    test('should not add note if there is any note in draft state on addNote', () => {
      const payload = createNote({ id: '1', category: '1' })
      const initialStateBeforeAddNote = {
        ...initialState,
        notes: [
          createNote({ id: '1', category: '1' }),
          createNote({ id: '1', category: '1', text: '' }),
        ],
      }
      const nextState = { ...initialStateBeforeAddNote }
      const result = reducer(initialStateBeforeAddNote, addNote(payload))

      expect(result).toEqual(nextState)
    })
  })

  test('should update note content and lastUpdated on updateNote', () => {
    const payload = createNote({ id: '1', category: '1' })
    const initialStateBeforeUpdateNote = {
      ...initialState,
      notes: [createNote({ id: '1', category: '1' })],
    }
    const nextState = { ...initialStateBeforeUpdateNote, notes: [payload] }
    const result = reducer(initialStateBeforeUpdateNote, updateNote(payload))

    expect(result).toEqual(nextState)
  })

  describe('deleteNotes', () => {
    test('should deleteNotes from notes list and set activeNoteId and selectedNotesIds on deleteNotes', () => {
      const payload = ['1', '4']
      const notes = [
        createNote({ id: '1', category: '1' }),
        createNote({ id: '2', category: '1' }),
        createNote({ id: '3' }),
        createNote({ id: '4', category: '1' }),
      ]
      const initialStateBeforeDeleteNotes = {
        ...initialState,
        notes: notes,
        activeCategoryId: '1',
      }
      const nextState = {
        ...initialStateBeforeDeleteNotes,
        notes: [notes[1], notes[2]],
        activeNoteId: '',
        selectedNotesIds: [''],
      }
      const result = reducer(initialStateBeforeDeleteNotes, deleteNotes(payload))

      expect(result).toEqual(nextState)
    })
  })

  describe('addCategory', () => {
    test('should add Category to the existing single note', () => {
      const payload = {
        categoryId: '3',
        noteId: '2',
      }
      const note = createNote({ id: '2' })
      const initialStateBeforeAddingCategoryToNote = {
        ...initialState,
        notes: [note],
      }

      const nextState = {
        ...initialStateBeforeAddingCategoryToNote,
        notes: [
          {
            ...note,
            category: '3',
          },
        ],
      }
      const result = reducer(initialStateBeforeAddingCategoryToNote, addCategoryToNote(payload))

      expect(result).toEqual(nextState)
    })

    test('should add Category to the requested note and selected notes', () => {
      const payload = {
        categoryId: '3',
        noteId: '2',
      }
      const notes = [createNote({ id: '1' }), createNote({ id: '2' }), createNote({ id: '3' })]
      const initialStateBeforeAddingCategoryToNote = {
        ...initialState,
        notes,
        selectedNotesIds: ['1', '2'],
      }

      const nextState = {
        ...initialStateBeforeAddingCategoryToNote,
        notes: [
          {
            ...notes[0],
            category: '3',
          },
          {
            ...notes[1],
            category: '3',
          },
          notes[2],
        ],
      }
      const result = reducer(initialStateBeforeAddingCategoryToNote, addCategoryToNote(payload))

      expect(result).toEqual(nextState)
    })
  })

  describe('updateActiveNote', () => {
    const notes = [createNote({ id: '1', category: '3' }), createNote({ id: '2' })]
    test('should update active note id on updateActiveNote when multiSelect is false', () => {
      const payload = {
        multiSelect: false,
        noteId: '2',
      }
      const initialStateBeforeUpdatingActiveNote = {
        ...initialState,
        notes,
      }

      const nextState = { ...initialStateBeforeUpdatingActiveNote, activeNoteId: '2' }
      const result = reducer(initialStateBeforeUpdatingActiveNote, updateActiveNote(payload))

      expect(result).toEqual(nextState)
    })
    test('should update active note id on updateActiveNote when multiSelect is true', () => {
      const payload = {
        multiSelect: true,
        noteId: '2',
      }
      const initialStateBeforeUpdatingActiveNote = {
        ...initialState,
        notes,
        selectedNotesIds: ['1', '2'],
      }

      const nextState = { ...initialStateBeforeUpdatingActiveNote, activeNoteId: '2' }
      const result = reducer(initialStateBeforeUpdatingActiveNote, updateActiveNote(payload))

      expect(result).toEqual(nextState)
    })
  })

  describe('updateActiveCategory', () => {
    test('should update active category id , active note id, selected note ids and filter the draft notes on updateActiveCategoryId', () => {
      const payload = '3'
      const initialStateBeforeUpdatingActiveCategoryId = {
        ...initialState,
        notes: [
          createNote({ id: '1', category: '3' }),
          createNote({ id: '4', category: '3', text: '' }),
          createNote({ id: '7', category: '3' }),
        ],
      }
      const nextState = {
        ...initialStateBeforeUpdatingActiveCategoryId,
        activeFolder: Folder.CATEGORY,
        activeCategoryId: '3',
        activeNoteId: '1',
        selectedNotesIds: ['1'],
        notes: [createNote({ id: '1', category: '3' }), createNote({ id: '7', category: '3' })],
      }
      const result = reducer(
        initialStateBeforeUpdatingActiveCategoryId,
        updateActiveCategoryId(payload)
      )

      expect(result).toEqual(nextState)
    })
  })

  describe('swapFolder', () => {
    test('should swap folders and set FAVORITES folder as active folder', () => {
      const payload = Folder.FAVORITES
      const notes = [
        createNote({ id: '1', category: '3' }),
        createNote({ id: '2', favorite: true }),
        createNote({ id: '4', category: '3', text: '' }),
        createNote({ id: '7', category: '3', favorite: true }),
      ]
      const initialStateBeforeUpdatingActiveFolder = {
        ...initialState,
        notes: notes,
      }
      const nextState = {
        ...initialStateBeforeUpdatingActiveFolder,
        activeFolder: Folder.FAVORITES,
        activeCategoryId: '',
        activeNoteId: '2',
        selectedNotesIds: ['2'],
        notes: [notes[0], notes[1], notes[3]],
      }
      const result = reducer(
        initialStateBeforeUpdatingActiveFolder,
        swapFolder({ folder: payload })
      )

      expect(result).toEqual(nextState)
    })

    test('should swap folders and set SCRATCHPAD folder as active folder', () => {
      const payload = Folder.SCRATCHPAD
      const notes = [
        createNote({ id: '1', category: '3' }),
        createNote({ id: '2', scratchpad: true }),
        createNote({ id: '4', category: '3', text: '' }),
        createNote({ id: '7', category: '3', scratchpad: true }),
      ]
      const initialStateBeforeUpdatingActiveFolder = {
        ...initialState,
        notes: notes,
      }
      const nextState = {
        ...initialStateBeforeUpdatingActiveFolder,
        activeFolder: Folder.SCRATCHPAD,
        activeCategoryId: '',
        activeNoteId: '2',
        selectedNotesIds: ['2'],
        notes: [notes[0], notes[1], notes[3]],
      }
      const result = reducer(
        initialStateBeforeUpdatingActiveFolder,
        swapFolder({ folder: payload })
      )

      expect(result).toEqual(nextState)
    })

    test('should swap folders and set TRASH folder as active folder', () => {
      const payload = Folder.TRASH
      const notes = [
        createNote({ id: '1', category: '3' }),
        createNote({ id: '2', trash: true }),
        createNote({ id: '4', category: '3', text: '' }),
        createNote({ id: '7', category: '3', trash: true }),
      ]
      const initialStateBeforeUpdatingActiveFolder = {
        ...initialState,
        notes: notes,
      }
      const nextState = {
        ...initialStateBeforeUpdatingActiveFolder,
        activeFolder: Folder.TRASH,
        activeCategoryId: '',
        activeNoteId: '2',
        selectedNotesIds: ['2'],
        notes: [notes[0], notes[1], notes[3]],
      }
      const result = reducer(
        initialStateBeforeUpdatingActiveFolder,
        swapFolder({ folder: payload })
      )

      expect(result).toEqual(nextState)
    })
  })

  describe('assignFavorite', () => {
    test('should assign Favorite To Notes', () => {
      const payload = '2'
      const notes = [
        createNote({ id: '1', category: '3', favorite: true }),
        createNote({ id: '2', category: '3' }),
      ]
      const initialStateBeforeAssigningFavoriteToNotes = {
        ...initialState,
        notes: notes,
      }
      const nextState = {
        ...initialStateBeforeAssigningFavoriteToNotes,
        notes: [notes[0], { ...notes[1], favorite: true }],
      }
      const result = reducer(
        initialStateBeforeAssigningFavoriteToNotes,
        assignFavoriteToNotes(payload)
      )

      expect(result).toEqual(nextState)
    })

    test('should assign Favorite To Notes which are in selectedNotesIds', () => {
      const payload = '2'
      const notes = [createNote({ id: '1', category: '3' }), createNote({ id: '2', category: '3' })]
      const initialStateBeforeAssigningFavoriteToNotes = {
        ...initialState,
        notes,
        selectedNotesIds: ['2', '1'],
      }
      const nextState = {
        ...initialStateBeforeAssigningFavoriteToNotes,
        notes: [
          { ...notes[0], favorite: true },
          {
            ...notes[1],
            favorite: true,
          },
        ],
        selectedNotesIds: ['2', '1'],
      }
      const result = reducer(
        initialStateBeforeAssigningFavoriteToNotes,
        assignFavoriteToNotes(payload)
      )

      expect(result).toEqual(nextState)
    })
  })

  describe('toggleFavoriteNotes', () => {
    test('should toggle Favorite notes for selected ids', () => {
      const payload = '1'
      const notes = [
        createNote({ id: '1', category: '3', favorite: true }),
        createNote({ id: '2' }),
        createNote({ id: '3' }),
      ]
      const initialStateBeforeTogglingFavoriteToNotes = {
        ...initialState,
        notes: notes,
        selectedNotesIds: ['2', '1'],
      }
      const nextState = {
        ...initialStateBeforeTogglingFavoriteToNotes,
        notes: [
          {
            ...notes[0],
            favorite: false,
          },
          {
            ...notes[1],
            favorite: true,
          },
          notes[2],
        ],
        selectedNotesIds: ['2', '1'],
      }
      const result = reducer(
        initialStateBeforeTogglingFavoriteToNotes,
        toggleFavoriteNotes(payload)
      )

      expect(result).toEqual(nextState)
    })
    test('should toggle Favorite notes only for passed id when there are no selectedNotesIds', () => {
      const payload = '1'
      const notes = [
        createNote({ id: '1', category: '3', favorite: true }),
        createNote({ id: '2' }),
        createNote({ id: '3' }),
      ]
      const initialStateBeforeTogglingFavoriteToNotes = {
        ...initialState,
        notes: notes,
        selectedNotesIds: [],
      }
      const nextState = {
        ...initialStateBeforeTogglingFavoriteToNotes,
        notes: [
          {
            ...notes[0],
            favorite: false,
          },
          notes[1],
          notes[2],
        ],
        selectedNotesIds: [],
      }
      const result = reducer(
        initialStateBeforeTogglingFavoriteToNotes,
        toggleFavoriteNotes(payload)
      )

      expect(result).toEqual(nextState)
    })
  })

  describe('assignTrash', () => {
    const notes = [
      createNote({ id: '1', category: '3', favorite: true }),
      createNote({ id: '2' }),
      createNote({ id: '3' }),
    ]
    test('should assign trash to all selected ids', () => {
      const payload = '1'

      const initialStateBeforeAssigningTrashToNotes = {
        ...initialState,
        notes,
        selectedNotesIds: ['2', '1'],
      }
      const nextState = {
        ...initialStateBeforeAssigningTrashToNotes,
        notes: [
          {
            ...notes[0],
            trash: true,
          },
          {
            ...notes[1],
            trash: true,
          },
          {
            ...notes[2],
          },
        ],
        selectedNotesIds: [''],
        activeNoteId: '',
      }
      const result = reducer(initialStateBeforeAssigningTrashToNotes, assignTrashToNotes(payload))

      expect(result).toEqual(nextState)
    })

    test('should assign trash to given payload id', () => {
      const payload = '3'
      const initialStateBeforeAssigningTrashToNotes = {
        ...initialState,
        notes,
        selectedNotesIds: ['2', '1'],
      }
      const nextState = {
        ...initialStateBeforeAssigningTrashToNotes,
        notes: [
          notes[0],
          notes[1],
          {
            ...notes[2],
            trash: true,
          },
        ],
        selectedNotesIds: [''],
        activeNoteId: '',
      }
      const result = reducer(initialStateBeforeAssigningTrashToNotes, assignTrashToNotes(payload))

      expect(result).toEqual(nextState)
    })
  })

  describe('toggleTrash', () => {
    test('should toggle all selected trash notes', () => {
      const payload = '2'
      const notes = [
        createNote({ id: '1', category: '3', favorite: true }),
        createNote({ id: '2', trash: true }),
        createNote({ id: '3', trash: false }),
      ]
      const initialStateBeforeTogglingTrashToNotes = {
        ...initialState,
        notes,
        selectedNotesIds: ['2', '3'],
      }
      const nextState = {
        ...initialStateBeforeTogglingTrashToNotes,
        notes: [notes[0], { ...notes[1], trash: false }, { ...notes[2], trash: true }],
        selectedNotesIds: ['1'],
        activeNoteId: '1',
      }
      const result = reducer(initialStateBeforeTogglingTrashToNotes, toggleTrashNotes(payload))

      expect(result).toEqual(nextState)
    })

    test('should toggle only payload id trash notes', () => {})

    const payload = '2'
    const notes = [
      createNote({ id: '1', category: '3', favorite: true }),
      createNote({ id: '2', trash: false }),
      createNote({ id: '3' }),
    ]
    const initialStateBeforeTogglingTrashToNotes = {
      ...initialState,
      notes,
      selectedNotesIds: ['3'],
    }
    const nextState = {
      ...initialStateBeforeTogglingTrashToNotes,
      notes: [
        notes[0],
        {
          ...notes[1],
          trash: true,
        },
        notes[2],
      ],
      selectedNotesIds: [''],
      activeNoteId: '',
    }
    const result = reducer(initialStateBeforeTogglingTrashToNotes, toggleTrashNotes(payload))

    expect(result).toEqual(nextState)
  })

  describe('unassignTrash', () => {
    test('should unassign all selected notes from trash', () => {
      const payload = '2'
      const notes = [
        createNote({ id: '1', category: '3', favorite: true }),
        createNote({ id: '2', trash: true }),
        createNote({ id: '3', trash: false }),
      ]
      const initialStateBeforeUnassigningTrashFromNotes = {
        ...initialState,
        notes,
        selectedNotesIds: ['2', '3'],
      }
      const nextState = {
        ...initialStateBeforeUnassigningTrashFromNotes,
        notes: [
          notes[0],
          {
            ...notes[1],
            trash: false,
          },
          notes[2],
        ],
        selectedNotesIds: ['2', '3'],
        activeNoteId: '',
      }
      const result = reducer(
        initialStateBeforeUnassigningTrashFromNotes,
        unassignTrashFromNotes(payload)
      )

      expect(result).toEqual(nextState)
    })

    test('should unassign only payload id trash note', () => {
      const payload = '2'
      const notes = [
        createNote({ id: '1', category: '3', favorite: true }),
        createNote({ id: '2', trash: true }),
        createNote({ id: '3', trash: false }),
      ]
      const initialStateBeforeUnassigningTrashFromNotes = {
        ...initialState,
        notes,
        selectedNotesIds: ['3'],
      }
      const nextState = {
        ...initialStateBeforeUnassigningTrashFromNotes,
        notes: [
          notes[0],
          {
            ...notes[1],
            trash: false,
          },
          notes[2],
        ],
        selectedNotesIds: ['3'],
        activeNoteId: '',
      }
      const result = reducer(
        initialStateBeforeUnassigningTrashFromNotes,
        unassignTrashFromNotes(payload)
      )

      expect(result).toEqual(nextState)
    })
  })

  describe('updateSelectedNotes', () => {
    test('should update selected notes ids when multiSelect is false', () => {
      const payload = {
        noteId: '2',
        multiSelect: false,
      }
      const initialStateBeforeUpdatingSelectedNotes = {
        ...initialState,
        selectedNotesIds: [],
        notes: [createNote({ id: '2' })],
      }
      const nextState = {
        ...initialStateBeforeUpdatingSelectedNotes,
        selectedNotesIds: ['2'],
      }

      const result = reducer(initialStateBeforeUpdatingSelectedNotes, updateSelectedNotes(payload))

      expect(result).toEqual(nextState)
    })

    test('should update selected notes ids when multiSelect is true', () => {
      const payload = {
        noteId: '3',
        multiSelect: true,
      }
      const initialStateBeforeUpdatingSelectedNotes = {
        ...initialState,
        selectedNotesIds: ['2'],
        notes: [createNote({ id: '2' }), createNote({ id: '3' })],
      }
      const nextState = {
        ...initialStateBeforeUpdatingSelectedNotes,
        selectedNotesIds: ['2', '3'],
      }

      const result = reducer(initialStateBeforeUpdatingSelectedNotes, updateSelectedNotes(payload))

      expect(result).toEqual(nextState)
    })

    test('should update selected notes ids when multiSelect is true and selectedNotesIds are more than 1', () => {
      const payload = {
        noteId: '4',
        multiSelect: true,
      }
      const initialStateBeforeUpdatingSelectedNotes = {
        ...initialState,
        selectedNotesIds: ['2', '3'],
        notes: [createNote({ id: '2' }), createNote({ id: '3' }), createNote({ id: '4' })],
      }
      const nextState = {
        ...initialStateBeforeUpdatingSelectedNotes,
        selectedNotesIds: ['2', '3', '4'],
      }

      const result = reducer(initialStateBeforeUpdatingSelectedNotes, updateSelectedNotes(payload))

      expect(result).toEqual(nextState)
    })
  })

  test('should permanently empty trash', () => {
    const initialStateBeforeEmptyingTRash = {
      ...initialState,
      notes: [createNote({ id: '2', trash: true }), createNote({ id: '3' })],
    }
    const nextState = {
      ...initialStateBeforeEmptyingTRash,
      notes: [createNote({ id: '3' })],
    }

    const result = reducer(initialStateBeforeEmptyingTRash, permanentlyEmptyTrash())

    expect(result).toEqual(nextState)
  })

  test('should prune notes', () => {
    const initialStateBeforePrune = {
      ...initialState,
      notes: [
        createNote({ id: '1', trash: true, text: '' }),
        createNote({ id: '2', trash: true, text: '' }),
        createNote({ id: '3' }),
      ],
      selectedNotesIds: ['2'],
    }
    const nextState = {
      ...initialStateBeforePrune,
      notes: [createNote({ id: '2', trash: true, text: '' }), createNote({ id: '3' })],
    }
    const result = reducer(initialStateBeforePrune, pruneNotes())

    expect(result).toEqual(nextState)
  })

  test('should set searchValue to payload on searchNotes', () => {
    const payload = 'searchText'
    const nextState = {
      ...initialState,
      searchValue: payload,
    }
    const result = reducer(initialState, searchNotes(payload))

    expect(result).toEqual(nextState)
  })

  test('should set loading true on loadNotes', () => {
    const nextState = {
      ...initialState,
      loading: true,
    }
    const result = reducer(initialState, loadNotes())

    expect(result).toEqual(nextState)
  })

  test('should set loading false and error to payload on loadNotesError', () => {
    const payload = 'error'
    const nextState = {
      ...initialState,
      loading: false,
      error: payload,
    }
    const result = reducer(initialState, loadNotesError(payload))

    expect(result).toEqual(nextState)
  })

  test('should set value for notes, activeNoteId and selectedNotesIds on loadNotesSuccess', () => {
    const payload = [createNote({ id: '2', text: '' })]
    const nextState = {
      ...initialState,
      loading: false,
      notes: payload,
      activeNoteId: '2',
      selectedNotesIds: ['2'],
    }
    const result = reducer(initialState, loadNotesSuccess({ notes: payload }))

    expect(result).toEqual(nextState)
  })
})
