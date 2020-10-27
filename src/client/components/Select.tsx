import React from 'react'

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps {
  options: SelectOption[]
  onChange: (selectedOption: SelectOption) => void
  selectedValue: string
  testId: string
}

export const Select: React.FC<SelectProps> = ({ options, selectedValue, onChange, testId }) => {
  const getSelectedOption = (options: SelectOption[], value: string): SelectOption => {
    return options.filter((option: SelectOption) => {
      return value === option.value
    })[0]
  }

  return (
    <select
      onChange={(event) => onChange(getSelectedOption(options, event.target.value))}
      value={selectedValue}
      data-testid={testId}
    >
      {options.map((selectOption) => (
        <option key={selectOption.value} value={selectOption.value}>
          {selectOption.label}
        </option>
      ))}
    </select>
  )
}
