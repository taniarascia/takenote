import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { swapNote, pruneNotes } from 'actions'
import { NoteItem, ApplicationState } from 'types'
import { getNoteTitle } from 'helpers'

interface NoteListProps {
  activeNoteId: string
  notes: NoteItem[]
  swapNote: Function
  pruneNotes: Function
}

const NoteList: React.FC<NoteListProps> = ({ activeNoteId, notes, swapNote, pruneNotes }) => (
  <aside className="note-sidebar">
    <div className="note-list">
      {notes.map(note => {
        const noteTitle: string = getNoteTitle(note.text)

        return (
          <div
            className={note.id === activeNoteId ? 'note-each active' : 'note-each'}
            key={note.id}
            onClick={() => {
              if (note.id !== activeNoteId) {
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

const mapStateToProps = (state: ApplicationState) => ({
  notes: state.noteState.notes,
  activeNoteId: state.noteState.activeNoteId,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  swapNote: (noteId: string) => dispatch(swapNote(noteId)),
  pruneNotes: () => dispatch(pruneNotes()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)
