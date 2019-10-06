import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { addNote, swapNote, deleteNote, syncState } from 'actions'
import uuid from 'uuid/v4'
import { NoteItem } from 'types'
import { getNoteTitle, downloadNote } from 'helpers'
// import { useInterval } from 'helpers/hooks'

interface NavigationProps {
  addNote: Function
  swapNote: Function
  deleteNote: Function
  syncState: Function
  activeNote: NoteItem
  notes: NoteItem[]
  syncing: boolean
}

const Navigation: React.FC<NavigationProps> = ({
  activeNote,
  addNote,
  swapNote,
  deleteNote,
  syncState,
  notes,
  syncing,
}) => {
  // useInterval(() => {
  //   syncState(notes)
  // }, 30000)

  return (
    <nav className="navigation">
      <button
        className="nav-button"
        onClick={async () => {
          const note = { id: uuid(), text: '', created: '', lastUpdated: '' }

          if ((activeNote && activeNote.text !== '') || !activeNote) {
            await addNote(note)
            swapNote(note.id)
          }
        }}
      >
        + New Note
      </button>
      <button
        className="nav-button"
        onClick={() => {
          if (activeNote) {
            deleteNote(activeNote.id)
          }
        }}
      >
        X Delete Note
      </button>
      <button
        className="nav-button"
        onClick={() => {
          if (activeNote) {
            downloadNote(getNoteTitle(activeNote.text), activeNote.text)
          }
        }}
      >
        ^ Download Note
      </button>
      <button
        className="nav-button"
        onClick={() => {
          syncState(notes)
        }}
      >
        Sync notes
        {syncing && 'Syncing...'}
      </button>
    </nav>
  )
}

const mapStateToProps = state => ({
  syncing: state.noteState.syncing,
  notes: state.noteState.notes,
  activeNote: state.noteState.notes.find(note => note.id === state.noteState.active),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: note => dispatch(addNote(note)),
  swapNote: noteId => dispatch(swapNote(noteId)),
  deleteNote: noteId => dispatch(deleteNote(noteId)),
  syncState: notes => dispatch(syncState(notes)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
