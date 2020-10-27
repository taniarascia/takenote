import React from 'react'

import { Switch } from '@/components/Switch'

export interface OptionProps {
  title: string
  description: string
  toggle: () => void
  checked: boolean
  testId: string
}

export const Option: React.FC<OptionProps> = ({ title, description, toggle, checked, testId }) => {
  return (
    <div className="settings-option">
      <div>
        <h3>{title}</h3>
        <p className="description">{description}</p>
      </div>
      <Switch toggle={toggle} checked={checked} testId={testId} />
    </div>
  )
}
