import React, { KeyboardEventHandler, MouseEventHandler, useContext } from 'react'
import { Icon } from 'react-feather'

import { MenuUtilitiesContext } from '@/containers/ContextMenu'

export interface ContextMenuOptionProps {
  dataTestID: string
  handler: MouseEventHandler & KeyboardEventHandler
  icon: Icon
  text: string
  className?: string
}

export const ContextMenuOption: React.FC<ContextMenuOptionProps> = ({
  dataTestID,
  handler,
  className = 'nav-item',
  icon: IconCmp,
  text,
  ...rest
}) => {
  // ===========================================================================
  // Context
  // ===========================================================================

  const { setOptionsId } = useContext(MenuUtilitiesContext)

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const optionHandler: MouseEventHandler & KeyboardEventHandler = (
    event: React.MouseEvent<Element, MouseEvent> & React.KeyboardEvent<Element>
  ) => {
    handler(event)
    setOptionsId('')
  }

  return (
    <div
      data-testid={dataTestID}
      className={className}
      role="button"
      onClick={optionHandler}
      onKeyPress={optionHandler}
      tabIndex={0}
      {...rest}
    >
      <IconCmp className="nav-item-icon" size={18} />
      {text}
    </div>
  )
}
