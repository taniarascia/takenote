import React, { Fragment, useState } from 'react'

import { Tab } from './Tab'

export interface TabsProps {
  children: JSX.Element[]
}

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Preferences')

  return (
    <div className="tabs">
      <nav className="tab-list">
        {children.map((child) => {
          const { label, icon } = child.props

          return (
            <Tab
              icon={icon}
              activeTab={activeTab}
              key={label}
              label={label}
              onClick={setActiveTab}
            />
          )
        })}
      </nav>
      <div className="tab-content">
        {children.map((child) => {
          if (child.props.label !== activeTab) return

          return (
            <Fragment key={`${child.props.label}-panel`}>
              <h3>{child.props.label}</h3>
              {child.props.children}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
