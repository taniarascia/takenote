import React, { MouseEventHandler } from 'react'
import { Icon } from 'react-feather'

import { iconColor } from '@/constants'

export interface AppSidebarActionProps {
  dataTestID: string
  disabled?: boolean
  handler: MouseEventHandler
  icon: Icon
  label: string
}

const AppSidebarAction: React.FC<AppSidebarActionProps> = ({
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

export default AppSidebarAction
