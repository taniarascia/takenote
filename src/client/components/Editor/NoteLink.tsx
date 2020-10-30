import React from 'react'

import { NoteItem } from '@/types'
import { Errors } from '@/utils/enums'

import { getNoteTitle, getActiveNoteFromShortUuid } from '../../utils/helpers'

export interface NoteLinkProps {
  uuid: string
  notes: NoteItem[]
  handleNoteLinkClick: (e: React.SyntheticEvent, note: NoteItem) => void
}

const NoteLink: React.FC<NoteLinkProps> = ({ notes, uuid, handleNoteLinkClick }) => {
  const note = getActiveNoteFromShortUuid(notes, uuid)
  const title = note !== undefined ? getNoteTitle(note.text) : null

  if (note && title) return <a onClick={(e) => handleNoteLinkClick(e, note)}>{title}</a>

  return <span className="error">{Errors.INVALID_LINKED_NOTE_ID}</span>
}

export default NoteLink
