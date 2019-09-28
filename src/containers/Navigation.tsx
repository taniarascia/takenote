import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { addNote, swapNote, deleteNote } from 'actions'
import uuid from 'uuid/v4'
import { NoteItem } from 'types'

interface NavigationProps {
  addNote: Function
  swapNote: Function
  deleteNote: Function
  activeNote: NoteItem
}

const Navigation: React.FC<NavigationProps> = ({ activeNote, addNote, swapNote, deleteNote }) => {
  return (
    <nav className="navigation">
      <button
        className="nav-button"
        onClick={() => {
          const note = { id: uuid(), text: '', created: '', lastUpdated: '' }

          if (activeNote.text !== '') {
            addNote(note)
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
    </nav>
  )
}

const mapStateToProps = state => ({
  activeNote: state.noteState.data.find(note => note.id === state.noteState.active),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: note => dispatch(addNote(note)),
  swapNote: noteId => dispatch(swapNote(noteId)),
  deleteNote: noteId => dispatch(deleteNote(noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
