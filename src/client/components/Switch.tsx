import React from 'react'

export interface SwitchProps {
  toggle: () => void
  checked: boolean
  testId: string
}

export const Switch: React.FC<SwitchProps> = ({ toggle, checked, testId }) => {
  return (
    <label className="switch" data-testid={testId}>
      <input type="checkbox" onChange={toggle} checked={checked} />
      <span className="slider" />
    </label>
  )
}
