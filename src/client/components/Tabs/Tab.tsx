import React from 'react'
import { Icon } from 'react-feather'

export interface TabProps {
  label: string
  activeTab: string
  onClick: (label: string) => void
  icon: Icon
}

export const Tab: React.FC<TabProps> = ({ activeTab, label, icon: IconCmp, onClick }) => {
  const className = activeTab === label ? 'tab active' : 'tab'

  return (
    <div className={className} onClick={() => onClick(label)}>
      <IconCmp size={18} className="mr-1" aria-hidden="true" focusable="false" /> {label}
    </div>
  )
}
