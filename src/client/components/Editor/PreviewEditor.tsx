import React from 'react'
import ReactMarkdown from 'react-markdown'

import { NoteItem } from '@/types'

import { uuidPlugin } from '../../utils/reactMarkdownPlugins'

import NoteLink from './NoteLink'

export interface PreviewEditorProps {
  noteText: string
  directionText: string
  notes: NoteItem[]
}

export const PreviewEditor: React.FC<PreviewEditorProps> = ({ noteText, directionText, notes }) => {
  return (
    <ReactMarkdown
      plugins={[uuidPlugin]}
      renderers={{
        // eslint-disable-next-line react/display-name
        uuid: ({ value }) => <NoteLink uuid={value} notes={notes} />,
      }}
      className={`previewer previewer_direction-${directionText}`}
      source={noteText}
    />
  )
}
