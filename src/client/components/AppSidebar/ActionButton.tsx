import React, { MouseEventHandler } from 'react'
import { Icon, Plus } from 'react-feather'

import { TestID } from '@resources/TestID'

export interface ActionButtonProps {
  dataTestID: TestID
  disabled?: boolean
  label: string
  text: string
  handler: MouseEventHandler
}

export class ActionButton extends React.PureComponent<ActionButtonProps> {
  render(): React.ReactNode {
    const { dataTestID, disabled, label, text, handler } = this.props

    return (
      <button
        data-testid={dataTestID}
        className="action-button"
        aria-label={label}
        onClick={handler}
        disabled={disabled}
        title={label}
      >
        {this?.props?.children}
        <span>{text}</span>
      </button>
    )
  }
}
