import React from 'react'
import { Icon } from 'react-feather'

export interface TabPanelProps {
  label: string
  icon: Icon
  testId?: string
  children: JSX.Element[] | JSX.Element
}

export const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <section>{children}</section>
}
