import React, { KeyboardEventHandler, MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

export interface NoteOptionsButtonProps {
  dataTestID: string
  handler: MouseEventHandler & KeyboardEventHandler
  icon: Icon
  text: string
}

const NoteOptionsButton: React.FC<NoteOptionsButtonProps> = props => {
  const { dataTestID, handler, icon: IconCmp, text, ...rest } = props
  return (
    <div
      data-testid={dataTestID}
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
