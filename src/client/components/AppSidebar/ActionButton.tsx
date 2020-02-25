import React, { MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

import { iconColor } from '@/utils/constants'

export interface ActionButtonProps {
  dataTestID: string
  disabled?: boolean
  handler: MouseEventHandler
  icon: Icon
  label: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  dataTestID,
  disabled = false,
  handler,
  icon: IconCmp,
  label,
}) => {
  return (
    <button
      data-testid={dataTestID}
      className="action-button"
      aria-label={label}
      onClick={handler}
      disabled={disabled}
      title={label}
    >
      <span>
        <IconCmp
          size={18}
          className="action-button-icon"
          color={iconColor}
          aria-hidden="true"
          focusable="false"
        />
      </span>
    </button>
  )
}
