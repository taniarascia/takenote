import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { swapNote } from 'actions'

const NoteList = ({ notes, swapNote }) => (
  <aside className="sidebar">
    <div className="note-list">
      {notes.map(note => {
        // if the note has no newline, just cut to 50 characters
        const noteTitle =
          note.text.indexOf('\n') !== -1
            ? note.text.slice(0, note.text.indexOf('\n'))
            : note.text.slice(0, 50)

        return (
          <div
            className="note-title"
            key={note.id}
            onClick={() => {
              swapNote(note.id)
            }}
          >
            {noteTitle}
          </div>
        )
      })}
    </div>
  </aside>
)

const mapStateToProps = state => ({
  notes: state.notes,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  swapNote: noteId => dispatch(swapNote(noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
