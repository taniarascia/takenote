import React from 'react'
import { render } from '@testing-library/react'
import dayjs from 'dayjs'
import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import {
  LastSyncedNotification,
  LastSyncedNotificationProps,
} from '@/components/LastSyncedNotification'

describe('<LastSyncedNotification />', () => {
  it('renders the Tab component', () => {
    const enabledProps: LastSyncedNotificationProps = {
      datetime: '',
      pending: false,
      syncing: true,
    }

    const component = render(<LastSyncedNotification {...enabledProps} />)

    expect(component).toBeTruthy()
  })
  it('Should display syncing ', () => {
    const enabledProps: LastSyncedNotificationProps = {
      datetime: '',
      pending: false,
      syncing: true,
    }

    const { getByTestId } = render(<LastSyncedNotification {...enabledProps} />)

    expect(getByTestId(TestID.LAST_SYNCED_NOTIFICATION_SYNCING).innerHTML).toBe('Syncing...')
  })

  it('Should display Unsaved change ', () => {
    const enabledProps: LastSyncedNotificationProps = {
      datetime: '',
      pending: true,
      syncing: false,
    }

    const { getByTestId } = render(<LastSyncedNotification {...enabledProps} />)

    expect(getByTestId(TestID.LAST_SYNCED_NOTIFICATION_UNSAVED).innerHTML).toBe('Unsaved changes')
  })

  it('Should display date ', () => {
    const enabledProps: LastSyncedNotificationProps = {
      datetime: Date(),
      pending: false,
      syncing: false,
    }

    const { getByTestId } = render(<LastSyncedNotification {...enabledProps} />)
    expect(getByTestId(TestID.LAST_SYNCED_NOTIFICATION_DATE).innerHTML).toBe(
      dayjs(Date()).format('LT on L')
    )
  })
})
