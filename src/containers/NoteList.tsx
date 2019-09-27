import React from 'react'
import { connect } from 'react-redux'

const NoteList = ({ notes }) => (
  <aside className="sidebar">
    <div className="note-list">
      {notes.map(note => {
        // if the note has no newline, just cut to 50 characters
        const noteTitle =
          note.text.indexOf('\n') !== -1
            ? note.text.slice(0, note.text.indexOf('\n'))
            : note.text.slice(0, 50)

        return (
          <div className="note-title" key={note.id}>
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

export default connect(mapStateToProps)(NoteList)
