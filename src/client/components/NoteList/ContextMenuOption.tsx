import React, { KeyboardEventHandler, MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

export interface ContextMenuOptionProps {
  dataTestID: string
  handler: MouseEventHandler & KeyboardEventHandler
  icon: Icon
  text: string
  optionType?: string
}

export const ContextMenuOption: React.FC<ContextMenuOptionProps> = ({
  dataTestID,
  handler,
  optionType,
  icon: IconCmp,
  text,
  ...rest
}) => {
  return (
    <div
      data-testid={dataTestID}
      className={optionType === 'delete' ? 'nav-item delete-option' : 'nav-item'}
      role="button"
      onClick={handler}
      onKeyPress={handler}
      tabIndex={0}
      {...rest}
    >
      <IconCmp className="nav-item-icon" size={18} />
      {text}
    </div>
  )
}
