import React from 'react'
import dayjs from 'dayjs'
import { RefreshCw } from 'react-feather'

export interface LastSyncedNotificationProps {
  datetime: string
}

export const LastSyncedNotification: React.FC<LastSyncedNotificationProps> = ({ datetime }) => {
  return (
    <section className="app-sidebar-synced">
      <div className="last-synced">
        <RefreshCw size={14} className="app-sidebar-icon" />
        {dayjs(datetime).format('h:mm A on M/D/YYYY')}
      </div>
    </section>
  )
}
