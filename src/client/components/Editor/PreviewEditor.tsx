import React from 'react'
import ReactMarkdown from 'react-markdown'

export interface PreviewEditorProps {
  noteText: string
  directionText: string
}

export const PreviewEditor: React.FC<PreviewEditorProps> = ({ noteText, directionText }) => {
  return (
    <ReactMarkdown className={`previewer previewer_direction-${directionText}`} source={noteText} />
  )
}
