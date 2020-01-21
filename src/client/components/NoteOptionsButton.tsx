import React, { KeyboardEventHandler, MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

export interface NoteOptionsButtonProps {
  handler: MouseEventHandler & KeyboardEventHandler
  icon: Icon
  text: string
}

const NoteOptionsButton: React.FC<NoteOptionsButtonProps> = props => {
  const { handler, icon: IconCmp, text, ...rest } = props
  return (
    <div
      className="nav-item"
      role="button"
      onClick={handler}
      onKeyPress={handler}
      tabIndex={0}
      {...rest}
    >
      <IconCmp size={18} />
      {text}
    </div>
  )
}

export default NoteOptionsButton
