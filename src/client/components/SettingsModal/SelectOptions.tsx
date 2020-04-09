import React from 'react'

import { Select } from '../Select'

export interface OptionProps {
  title: string
  onChange: (selectedOption: any) => void
  selectedValue: string
  options: Array<{ value: string; label: string }>
}

export const SelectOptions: React.FC<OptionProps> = ({
  title,
  onChange,
  selectedValue,
  options,
}) => {
  return (
    <div className="settings-options">
      <div>{title}</div>
      <Select options={options} onChange={onChange} selectedValue={selectedValue} />
    </div>
  )
}
