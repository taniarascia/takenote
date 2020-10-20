import React from 'react'

import { NoteItem, CategoryItem } from '@/types'

export interface OptionProps {
  title: string
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  children: React.ReactNode
}

export const SvgOption: React.FC<OptionProps> = ({ title, onClick, children }) => {
  return (
    <div className="settings-option" onClick={onClick}>
      <div>{title}</div>
      {children}
    </div>
  )
}
