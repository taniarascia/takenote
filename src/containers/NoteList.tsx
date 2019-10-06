import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { swapNote, pruneNotes } from 'actions'
import { NoteItem } from 'types'
import { getNoteTitle } from 'helpers'

interface NoteListProps {
  active: string
  notes: NoteItem[]
  swapNote: Function
  pruneNotes: Function
}

const NoteList: React.FC<NoteListProps> = ({ active, notes, swapNote, pruneNotes }) => (
  <aside className="note-sidebar">
    <div className="note-list">
      {notes.map(note => {
        const noteTitle: string = getNoteTitle(note.text)

        return (
          <div
            className={note.id === active ? 'note-each active' : 'note-each'}
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
