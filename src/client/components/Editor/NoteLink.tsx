import React from 'react'
import { useDispatch } from 'react-redux'

import { NoteItem } from '@/types'
import { updateActiveNote, updateSelectedNotes, pruneNotes } from '@/slices/note'

import { getNoteTitle, getActiveNoteFromShortUuid } from '../../utils/helpers'

export interface NoteLinkProps {
  uuid: string
  notes: NoteItem[]
  handleNoteLinkClick: (note: NoteItem) => void
}

const NoteLink: React.FC<NoteLinkProps> = ({ notes, uuid, handleNoteLinkClick }) => {
  const note = getActiveNoteFromShortUuid(notes, uuid)
  const title = note !== undefined ? getNoteTitle(note.text) : null
  const notFoundErrorMsg = '<invalid note id provided>'

  if (note && title) return <a onClick={() => handleNoteLinkClick(note)}>{title}</a>

  return <span className="error">{notFoundErrorMsg}</span>
}

export default NoteLink
