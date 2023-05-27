import React from 'react'
import { Icon } from 'react-feather'

export interface TabProps {
  label: string
  activeTab: string
  testId?: string
  onClick: (label: string) => void
  icon: Icon
}

export const Tab: React.FC<TabProps> = ({ activeTab, label, testId, icon: IconCmp, onClick }) => {
  const className = activeTab === label ? 'tab active' : 'tab'

  return (
    <div
      role="button"
      key={label}
      data-testid={testId}
      className={className}
      onClick={() => onClick(label)}
    >
      <IconCmp size={18} className="mr-1" aria-hidden="true" focusable="false" /> {label}
    </div>
  )
}
