import React from 'react'
import { useDispatch } from 'react-redux'

import { NoteItem } from '@/types'
import { updateActiveNote, updateSelectedNotes, pruneNotes } from '@/slices/note'

import { getNoteTitle, getActiveNoteFromShortUuid } from '../../utils/helpers'

export interface NoteLinkProps {
  uuid: string
  notes: NoteItem[]
}

const NoteLink: React.FC<NoteLinkProps> = ({ notes, uuid }) => {
  const dispatch = useDispatch()

  const _updateSelectedNotes = (noteId: string, multiSelect: boolean) =>
    dispatch(updateSelectedNotes({ noteId, multiSelect }))

  const _updateActiveNote = (noteId: string, multiSelect: boolean) =>
    dispatch(updateActiveNote({ noteId, multiSelect }))

  const _pruneNotes = () => dispatch(pruneNotes())

  const note = getActiveNoteFromShortUuid(notes, uuid)
  const title = note !== undefined ? getNoteTitle(note.text) : null
  const notFoundErrorMsg = '<invalid note uuid provided>'

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (note) {
      _updateActiveNote(note.id, false)
      _updateSelectedNotes(note.id, false)
      _pruneNotes()
    }
  }

  if (title) return <a onClick={handleClick}>{title}</a>

  return <span className="error">{notFoundErrorMsg}</span>
}

export default NoteLink
