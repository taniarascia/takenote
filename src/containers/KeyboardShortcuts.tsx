import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { addNote, sendNoteToTrash, swapNote, syncState } from '../actions'
import { useKeyboard } from '../contexts/KeyboardContext'
import { downloadNote, getNoteTitle, newNote } from '../helpers'
import { useKey } from '../helpers/hooks'
import { ApplicationState, CategoryItem, NoteItem } from '../types'

interface KeyboardShortcutsProps {
  addNote: (note: NoteItem) => void
  swapNote: (noteId: string) => void
  sendNoteToTrash: (noteId: string) => void
  syncState: (notes: NoteItem[], categories: CategoryItem[]) => void
  activeNote?: NoteItem
  activeCategoryId: string
  activeFolder: string
  notes: NoteItem[]
  categories: CategoryItem[]
  syncing: boolean
}

const KeyboardShortcuts: React.FC<KeyboardShortcutsProps> = ({
  activeNote,
  activeCategoryId,
  activeFolder,
  addNote,
  swapNote,
  sendNoteToTrash,
  syncState,
  notes,
  categories,
}) => {
  const { addingTempCategory, setAddingTempCategory } = useKeyboard()
  const newNoteHandler = () => {
    const note = newNote(activeCategoryId, activeFolder)

    if ((activeNote && activeNote.text !== '') || !activeNote) {
      addNote(note)
      swapNote(note.id)
    }
  }

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  const trashNoteHandler = () => {
    if (activeNote && !activeNote.trash) {
      sendNoteToTrash(activeNote.id)
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
  sendNoteToTrash: (noteId: string) => dispatch(sendNoteToTrash(noteId)),
  syncState: (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState(notes, categories)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyboardShortcuts)
