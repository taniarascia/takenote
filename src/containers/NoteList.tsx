import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { swapNote, pruneNotes } from 'actions'
import { NoteItem } from 'types'

interface NoteListProps {
  active: string
  notes: NoteItem[]
  swapNote: Function
  pruneNotes: Function
}

const NoteList: React.FC<NoteListProps> = ({ active, notes, swapNote, pruneNotes }) => (
  <aside className="sidebar">
    <div className="note-list">
      {notes.map(note => {
        let noteTitle: string

        if (!note.text) {
          noteTitle = 'New Note'
        } else if (note.text.indexOf('\n') !== -1) {
          noteTitle = note.text.slice(0, note.text.indexOf('\n'))
        } else {
          noteTitle = note.text.slice(0, 50)
        }

        return (
          <div
            className={note.id === active ? 'note-title active' : 'note-title'}
            key={note.id}
            onClick={() => {
              if (note.id !== active) {
                swapNote(note.id)
                pruneNotes()
              }
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
  notes: state.noteState.notes,
  active: state.noteState.active,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  swapNote: noteId => dispatch(swapNote(noteId)),
  pruneNotes: () => dispatch(pruneNotes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
