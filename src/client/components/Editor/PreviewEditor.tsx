import React from 'react'
import ReactMarkdown from 'react-markdown'

export interface PreviewEditorProps {
  noteText: string
  directionText: string
  togglePreviewMarkdown: () => {}
}
export const PreviewEditor: React.FC<PreviewEditorProps> = ({
  noteText,
  directionText,
  togglePreviewMarkdown,
}) => {
  return (
    <>
      <ReactMarkdown
        className={`previewer previewer_direction-${directionText}`}
        source={noteText}
      />
      <button className="preview-button" onClick={togglePreviewMarkdown}>
        Edit
      </button>
    </>
  )
}
