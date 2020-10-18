import React from 'react'

import { Switch } from '@/components/Switch'

export interface OptionProps {
  title: string
  toggle: () => void
  checked: boolean
}

export const Option: React.FC<OptionProps> = ({ title, toggle, checked }) => {
  return (
    <div className="settings-option">
      <div>{title}</div>
      <Switch toggle={toggle} checked={checked} />
    </div>
  )
}
