import React, { MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

import { iconColor } from '@/utils/constants'

export interface IconButtonProps {
  dataTestID: string
  disabled?: boolean
  handler: MouseEventHandler
  icon: Icon
  text: string
}

export const IconButton: React.FC<IconButtonProps> = ({
  dataTestID,
  disabled = false,
  handler,
  icon: IconCmp,
  text,
}) => {
  return (
    <button
      data-testid={dataTestID}
      aria-label={text}
      onClick={handler}
      disabled={disabled}
      title={text}
      className="icon-button"
    >
      <IconCmp
        size={18}
        className="button-icon"
        color={iconColor}
        aria-hidden="true"
        focusable="false"
      />
      {text}
    </button>
  )
}
