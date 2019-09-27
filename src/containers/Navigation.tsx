import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { addNote, swapNote } from 'actions'
import uuid from 'uuid/v4'

const Navigation = props => {
  const { addNote, swapNote } = props

  return (
    <nav className="navigation">
      <button
        onClick={() => {
          const note = { id: uuid(), text: 'New note', created: '', lastUpdated: '' }

          addNote(note)
          swapNote(note.id)
        }}
      >
        + New Note
      </button>
    </nav>
  )
}

const mapStateToProps = state => ({
  state,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: note => dispatch(addNote(note)),
  swapNote: noteId => dispatch(swapNote(noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation)
