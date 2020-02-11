import React from 'react'
import moment from 'moment'
import { Check } from 'react-feather'

export interface LastSyncedProps {
  datetime: string
}

export const LastSynced: React.FC<LastSyncedProps> = ({ datetime }) => {
  return (
    <section className="app-sidebar-synced">
      <div className="last-synced">
        <Check size={14} className="app-sidebar-icon" />
        {moment(datetime).format('h:mm A on M/D/Y')}
      </div>
    </section>
  )
}
