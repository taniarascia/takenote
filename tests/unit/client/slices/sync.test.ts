import { PayloadAction } from '@reduxjs/toolkit'

import reducer, { initialState, setPendingSync, sync, syncError, syncSuccess } from '@/slices/sync'

describe('SycSlice', () => {
  test('should return initial state on first run', () => {
    const nextState = initialState
    const action = {} as PayloadAction
    const result = reducer(undefined, action)

    expect(result).toEqual(nextState)
  })

  test('should set pendingSync to true on setPendingSync', () => {
    const nextState = { ...initialState, pendingSync: true }
    const result = reducer(undefined, setPendingSync())

    expect(result).toEqual(nextState)
  })

  test('should set syncing to true on sync', () => {
    const payload = {
      categories: [],
      notes: [],
    }
    const nextState = { ...initialState, syncing: true }
    const result = reducer(initialState, sync(payload))

    expect(result).toEqual(nextState)
  })

  test('should set syncing to false and error to payload on syncError', () => {
    const payload = 'test error'
    const nextState = { ...initialState, syncing: false, error: payload }
    const result = reducer(initialState, syncError(payload))

    expect(result).toEqual(nextState)
  })

  test('should set syncing to false, pendingSync to false and lastSynced to payload on syncSuccess', () => {
    const payload = 'lastUpdated'
    const nextState = {
      ...initialState,
      syncing: false,
      lastSynced: payload,
      pendingSync: false,
      error: '',
    }
    const result = reducer(initialState, syncSuccess(payload))

    expect(result).toEqual(nextState)
  })
})
