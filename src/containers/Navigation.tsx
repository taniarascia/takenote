import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { addNote, swapNote, deleteNote, syncState } from 'actions'
import { NoteItem, CategoryItem } from 'types'
import { getNoteTitle, downloadNote } from 'helpers'
// import { useInterval } from 'helpers/hooks'
import { useKey } from 'helpers/hooks'

interface NavigationProps {
  addNote: Function
  swapNote: Function
  deleteNote: Function
  syncState: Function
  activeNote: NoteItem
  notes: NoteItem[]
  categories: CategoryItem[]
  syncing: boolean
}

const Navigation: React.FC<NavigationProps> = ({
  activeNote,
  addNote,
  swapNote,
  deleteNote,
  syncState,
  notes,
  categories,
  syncing,
}) => {
  // useInterval(() => {
  //   syncState
  // }, 30000)

  const newNoteHandler = () => {
    const note = { id: uuid(), text: '', created: '', lastUpdated: '' }

    if ((activeNote && activeNote.text !== '') || !activeNote) {
      addNote(note)
      swapNote(note.id)
    }
  }

  const deleteNoteHandler = () => {
    if (activeNote) {
      deleteNote(activeNote.id)
    }
  }

  const syncNotesHandler = () => {
    syncState(notes, categories)
  }

  const downloadNoteHandler = () => {
    if (activeNote) {
      downloadNote(getNoteTitle(activeNote.text), activeNote.text)
    }
  }

  useKey('ctrl+n', () => {
    newNoteHandler()
  })

  useKey('ctrl+backspace', () => {
    deleteNoteHandler()
  })

  useKey('ctrl+s', () => {
    syncNotesHandler()
  })

  // useKey('ctrl+up', () => {
  //   swapNote()
  // })

  return (
    <nav className="navigation">
      <button className="nav-button" onClick={newNoteHandler}>
        + New Note
      </button>
      <button className="nav-button" onClick={deleteNoteHandler}>
        X Delete Note
      </button>
      <button className="nav-button" onClick={downloadNoteHandler}>
        ^ Download Note
      </button>
      <button className="nav-button" onClick={syncNotesHandler}>
        Sync notes
        {syncing && 'Syncing...'}
      </button>
    </nav>
  )
}

const mapStateToProps = state => ({
  syncing: state.syncState.syncing,
  notes: state.noteState.notes,
  categories: state.categoryState.categories,
  activeNote: state.noteState.notes.find(note => note.id === state.noteState.active),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: note => dispatch(addNote(note)),
  swapNote: noteId => dispatch(swapNote(noteId)),
  deleteNote: noteId => dispatch(deleteNote(noteId)),
  syncState: (notes, categories) => dispatch(syncState(notes, categories)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
