import React from 'react'

import { Select } from '../Select'

export interface OptionProps {
  title: string
  description: string
  onChange: (selectedOption: any) => void
  selectedValue: string
  options: Array<{ value: string; label: string }>
  testId: string
}

export const SelectOptions: React.FC<OptionProps> = ({
  title,
  description,
  onChange,
  selectedValue,
  options,
  testId,
}) => {
  return (
    <div className="settings-option">
      <div>
        <h3>{title}</h3>
        <p className="description">{description}</p>
      </div>
      <Select options={options} onChange={onChange} selectedValue={selectedValue} testId={testId} />
    </div>
  )
}
