import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { addNote, swapNote, deleteNote, syncState } from 'actions'
import uuid from 'uuid/v4'
import { NoteItem } from 'types'
import { getNoteTitle } from 'helpers'

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
  function downloadNote(filename, text) {
    var pom = document.createElement('a')
    pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
    pom.setAttribute('download', `${filename}.md`)

    if (document.createEvent) {
      var event = document.createEvent('MouseEvents')
      event.initEvent('click', true, true)
      pom.dispatchEvent(event)
    } else {
      pom.click()
    }
  }

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
