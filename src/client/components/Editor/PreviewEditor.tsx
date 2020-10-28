import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useDispatch } from 'react-redux'

import { updateActiveNote, updateSelectedNotes, pruneNotes } from '@/slices/note'
import { NoteItem } from '@/types'

import { uuidPlugin } from '../../utils/reactMarkdownPlugins'

import NoteLink from './NoteLink'

export interface PreviewEditorProps {
  noteText: string
  directionText: string
  notes: NoteItem[]
}

export const PreviewEditor: React.FC<PreviewEditorProps> = ({ noteText, directionText, notes }) => {
  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _updateSelectedNotes = (noteId: string, multiSelect: boolean) =>
    dispatch(updateSelectedNotes({ noteId, multiSelect }))

  const _updateActiveNote = (noteId: string, multiSelect: boolean) =>
    dispatch(updateActiveNote({ noteId, multiSelect }))

  const _pruneNotes = () => dispatch(pruneNotes())

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const handleNoteLinkClick = (note: NoteItem) => {
    if (note) {
      _updateActiveNote(note.id, false)
      _updateSelectedNotes(note.id, false)
      _pruneNotes()
    }
  }

  const returnNoteLink = (value: string) => {
    return <NoteLink uuid={value} notes={notes} handleNoteLinkClick={handleNoteLinkClick} />
  }

  return (
    <ReactMarkdown
      plugins={[uuidPlugin]}
      renderers={{
        uuid: ({ value }) => returnNoteLink(value),
      }}
      className={`previewer previewer_direction-${directionText}`}
      source={noteText}
    />
  )
}
