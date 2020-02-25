import { PayloadAction } from '@reduxjs/toolkit'

import reducer, { initialState, toggleSettingsModal } from '@/slices/settings'

describe('settings slice', () => {
  it('should return the initial state on first run', () => {
    const nextState = initialState
    const action = {} as PayloadAction
    const result = reducer(undefined, action)

    expect(result).toEqual(nextState)
  })

  it('should toggle open state', () => {
    const nextState = { ...initialState, isOpen: true }
    const result = reducer(initialState, toggleSettingsModal())

    expect(result).toEqual(nextState)
  })
})
