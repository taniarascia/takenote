import React from 'react'
import { GitHub } from 'react-feather'

import { iconColor } from '@/utils/constants'

export interface LinkToRepo {
  url: string
  label: string
}

export const LinkToRepo: React.FC<LinkToRepo> = ({ url, label }) => {
  return (
    <div className="app-sidebar-link" onClick={() => window.open(url, '_blank')} aria-label={label}>
      <GitHub size={15} color={iconColor} className="app-sidebar-icon" />
      {label}
    </div>
  )
}
