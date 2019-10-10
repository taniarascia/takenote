import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import moment from 'moment'
import { Download, X } from 'react-feather'
import { addNote, swapNote, sendNoteToTrash, syncState } from 'actions'
import { NoteItem, CategoryItem, ApplicationState } from 'types'
import { getNoteTitle, downloadNote } from 'helpers'
import { useKey } from 'helpers/hooks'

interface NoteOptionsProps {
  swapNote: (noteId: string) => void
  sendNoteToTrash: (noteId: string) => void
  activeNote?: NoteItem
  activeCategoryId: string
  notes: NoteItem[]
  categories: CategoryItem[]
}

const NoteOptions: React.FC<NoteOptionsProps> = ({
  activeNote,
  activeCategoryId,
  swapNote,
  sendNoteToTrash,
  notes,
  categories,
}) => {
  const newNoteHandler = () => {
    const note: NoteItem = {
      id: uuid(),
      text: '',
      created: moment().format(),
      lastUpdated: moment().format(),
      category: activeCategoryId ? activeCategoryId : undefined,
    }

    if ((activeNote && activeNote.text !== '') || !activeNote) {
      addNote(note)
      swapNote(note.id)
    }
  }

  const trashNoteHandler = () => {
    if (activeNote && !activeNote.trash) {
      sendNoteToTrash(activeNote.id)
    }
  }

  const syncNotesHandler = () => {
    syncState(notes, categories)
  }

  const downloadNoteHandler = () => {
    if (activeNote) {
      downloadNote(getNoteTitle(activeNote.text), activeNote)
    }
  }

  useKey('ctrl+n', () => {
    newNoteHandler()
  })

  useKey('ctrl+w', () => {
    trashNoteHandler()
  })

  useKey('ctrl+s', () => {
    syncNotesHandler()
  })

  return (
    <nav className="note-options-nav">
      <div className="nav-button" onClick={trashNoteHandler}>
        <X size={15} />
        Delete Note
      </div>
      <div className="nav-button" onClick={downloadNoteHandler}>
        <Download size={15} />
        Download Note
      </div>
    </nav>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  notes: state.noteState.notes,
  categories: state.categoryState.categories,
  activeNote: state.noteState.notes.find(note => note.id === state.noteState.activeNoteId),
  activeCategoryId: state.noteState.activeCategoryId,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  swapNote: (noteId: string) => dispatch(swapNote(noteId)),
  sendNoteToTrash: (noteId: string) => dispatch(sendNoteToTrash(noteId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteOptions)
