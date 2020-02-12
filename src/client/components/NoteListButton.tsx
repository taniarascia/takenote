import React, { MouseEventHandler } from 'react'

export interface NoteListButtonProps {
  dataTestID: string
  disabled?: boolean
  handler: MouseEventHandler
  label: string
}

const NoteListButton: React.FC<NoteListButtonProps> = ({
  dataTestID,
  disabled = false,
  handler,
  label,
}) => {
  return (
    <button
      data-testid={dataTestID}
      className="list-button"
      aria-label={label}
      onClick={handler}
      disabled={disabled}
      title={label}
    >
      {label}
    </button>
  )
}

export default NoteListButton
