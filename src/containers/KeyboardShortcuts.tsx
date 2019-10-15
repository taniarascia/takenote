import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import { useKeyboard } from 'contexts/KeyboardContext'
import { downloadNote, getNoteTitle, newNote } from 'helpers'
import { useKey } from 'helpers/hooks'
import { addNote, swapNote, toggleTrashedNote } from 'slices/note'
import { syncState } from 'slices/sync'
import { toggleDarkTheme } from 'slices/theme'
import { ApplicationState, CategoryItem, NoteItem } from 'types'

interface KeyboardShortcutsProps {
  addNote: (note: NoteItem) => void
  swapNote: (noteId: string) => void
  toggleTrashedNote: (noteId: string) => void
  syncState: (notes: NoteItem[], categories: CategoryItem[]) => void
  activeNote?: NoteItem
  activeCategoryId: string
  activeFolder: string
  notes: NoteItem[]
  categories: CategoryItem[]
  syncing: boolean
  toggleDarkTheme: () => void
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  activeNote,
  activeCategoryId,
  activeFolder,
  addNote,
  swapNote,
  toggleTrashedNote,
  syncState,
  notes,
  categories,
  toggleDarkTheme,
}) => {
  const { addingTempCategory, setAddingTempCategory } = useKeyboard()
  const newNoteHandler = () => {
    const note = newNote(activeCategoryId, activeFolder)

    if ((activeNote && activeNote.text !== '' && !activeNote.trash) || !activeNote) {
      addNote(note)
      swapNote(note.id)
    }
  }

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  const trashNoteHandler = () => {
    if (activeNote) {
      toggleTrashedNote(activeNote.id)
    }
  }

  const syncNotesHandler = () => {
    syncState(notes, categories)
  }

  const downloadNoteHandler = () => {
    if (activeNote) {
      downloadNote(getNoteTitle(activeNote.text), activeNote)
    }
  }

  const toggleDarkThemeHandler = () => {
    toggleDarkTheme()
  }

  useKey('ctrl+n', () => {
    newNoteHandler()
  })

  useKey('ctrl+c', () => {
    newTempCategoryHandler()
  })

  useKey('ctrl+w', () => {
    trashNoteHandler()
  })

  useKey('ctrl+s', () => {
    syncNotesHandler()
  })

  useKey('ctrl+d', () => {
    downloadNoteHandler()
  })

  useKey('ctrl+t', () => {
    toggleDarkThemeHandler()
  })

  return null
}

const mapStateToProps = (state: ApplicationState) => ({
  syncing: state.syncState.syncing,
  notes: state.noteState.notes,
  activeFolder: state.noteState.activeFolder,
  categories: state.categoryState.categories,
  activeNote: state.noteState.notes.find(note => note.id === state.noteState.activeNoteId),
  activeCategoryId: state.noteState.activeCategoryId,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: (note: NoteItem) => dispatch(addNote(note)),
  swapNote: (noteId: string) => dispatch(swapNote(noteId)),
  toggleTrashedNote: (noteId: string) => dispatch(toggleTrashedNote(noteId)),
  syncState: (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories })),
  toggleDarkTheme: () => dispatch(toggleDarkTheme()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyboardShortcuts)
