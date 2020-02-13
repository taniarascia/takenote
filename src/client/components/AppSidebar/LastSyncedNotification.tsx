import React from 'react'
import moment from 'moment'
import { RefreshCw } from 'react-feather'

export interface LastSyncedNotificationProps {
  datetime: string
}

export const LastSyncedNotification: React.FC<LastSyncedNotificationProps> = ({ datetime }) => {
  return (
    <section className="app-sidebar-synced">
      <div className="last-synced">
        <RefreshCw size={14} className="app-sidebar-icon" />
        {moment(datetime).format('h:mm A on M/D/Y')}
      </div>
    </section>
  )
}
