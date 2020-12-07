import React from 'react'
import dayjs from 'dayjs'

import { TestID } from '@resources/TestID'

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
      return <i data-testid={TestID.LAST_SYNCED_NOTIFICATION_SYNCING}>Syncing...</i>
    }

    if (pending) {
      return <i data-testid={TestID.LAST_SYNCED_NOTIFICATION_UNSAVED}>Unsaved changes</i>
    }

    if (datetime) {
      return (
        <span data-testid={TestID.LAST_SYNCED_NOTIFICATION_DATE}>
          {dayjs(datetime).format('LT on L')}
        </span>
      )
    }
  }

  return <div className="last-synced">{renderLastSynced()}</div>
}
