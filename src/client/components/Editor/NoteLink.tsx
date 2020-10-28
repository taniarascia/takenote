import React from 'react'

import { NoteItem } from '@/types'

import { getNoteTitle, getActiveNoteFromShortUuid } from '../../utils/helpers'

export interface NoteLinkProps {
  uuid: string
  notes: NoteItem[]
}

const NoteLink: React.FC<NoteLinkProps> = ({ notes, uuid }) => {
  const note = getActiveNoteFromShortUuid(notes, uuid)
  const title = note !== undefined ? getNoteTitle(note.text) : null
  const notFoundErrorMsg = '<linked note not found>'

  if (title) return <a href="#">{title}</a>

  return <span className="error">{notFoundErrorMsg}</span>
}

export default NoteLink
