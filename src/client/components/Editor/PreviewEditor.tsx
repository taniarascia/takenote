import React from 'react'
import ReactMarkdown from 'react-markdown'

export interface PreviewEditorProps {
  noteText: string
  togglePreviewMarkdown: () => {}
}

export const PreviewEditor: React.FC<PreviewEditorProps> = ({
  noteText,
  togglePreviewMarkdown,
}) => {
  return (
    <>
      <ReactMarkdown className="previewer" source={noteText} />
      <button className="preview-button" onClick={togglePreviewMarkdown}>
        Edit
      </button>
    </>
  )
}
