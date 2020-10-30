import React from 'react'
import dayjs from 'dayjs'

export interface LastSyncedNotificationProps {
  datetime: string
  pending: boolean
  syncing: boolean
}

export const LastSyncedNotification: React.FC<LastSyncedNotificationProps> = ({
  datetime,
  pending,
  syncing,
}) => {
  const renderLastSynced = () => {
    if (syncing) {
      return <i>Syncing...</i>
    }

    if (pending) {
      return <i>Unsaved changes</i>
    }

    if (datetime) {
      return <span>{dayjs(datetime).format('LT on L')}</span>
    }
  }

  return <div className="last-synced">{renderLastSynced()}</div>
}
