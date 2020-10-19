import React from 'react'
import dayjs from 'dayjs'

export interface LastSyncedNotificationProps {
  datetime: string
}

export const LastSyncedNotification: React.FC<LastSyncedNotificationProps> = ({ datetime }) => {
  return (
    <div className="last-synced">{datetime && dayjs(datetime).format('h:mm A on M/D/YYYY')}</div>
  )
}
