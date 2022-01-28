import React, { KeyboardEventHandler, MouseEventHandler, useContext } from 'react'
import { Icon } from 'react-feather'

import { starFillColor } from '@/utils/constants'
import { MenuUtilitiesContext } from '@/containers/ContextMenu'

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
      className={optionType === 'delete' ? 'nav-item delete-option' : 'nav-item'}
      role="button"
      onClick={optionHandler}
      onKeyPress={optionHandler}
      tabIndex={0}
      {...rest}
    >
      {text.includes('Remove') ? (
        <IconCmp className="nav-item-icon" fill={starFillColor} size={18} />
      ) : (
        <IconCmp className="nav-item-icon" size={18} />
      )}
      {/* <IconCmp className="nav-item-icon" size={18} /> */}
      {text}
    </div>
  )
}
