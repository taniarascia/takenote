import React from 'react'

export interface SwitchProps {
  toggle: () => void
  checked: boolean
}

export const Switch: React.FC<SwitchProps> = ({ toggle, checked }) => {
  return (
    <label className="switch">
      <input type="checkbox" onChange={toggle} checked={checked} />
      <span className="slider" />
    </label>
  )
}
