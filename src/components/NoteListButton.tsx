import React, { MouseEventHandler } from 'react'

export interface NoteListButtonProps {
  disabled?: boolean
  handler: MouseEventHandler
  label: string
}

const NoteListButton: React.FC<NoteListButtonProps> = props => {
  const { disabled = false, handler, label } = props
  return (
    <button
      className="list-button"
      aria-label={label}
      onClick={handler}
      disabled={disabled}
      title={label}
      data-cy={label}
    >
      {label}
    </button>
  )
}

export default NoteListButton
