import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppSidebar from 'containers/AppSidebar'
import KeyboardShortcuts from 'containers/KeyboardShortcuts'
import NoteEditor from 'containers/NoteEditor'
import NoteList from 'containers/NoteList'
import SettingsModal from 'containers/SettingsModal'
import { KeyboardProvider } from 'contexts/KeyboardContext'
import { loadCategories } from 'slices/category'
import { loadNotes } from 'slices/note'
import { RootState } from 'types'

const App: React.FC = () => {
  const { dark } = useSelector((state: RootState) => state.themeState)

  const dispatch = useDispatch()

  // TODO: Fix how the dispatchers interact with the `useEffect`s below
  const _loadNotes = () => dispatch(loadNotes())
  const _loadCategories = () => dispatch(loadCategories())

  useEffect(() => {
    _loadNotes()
  }, [_loadNotes])

  useEffect(() => {
    _loadCategories()
  }, [_loadCategories])

  return (
    <div className={`app ${dark ? 'dark' : ''}`}>
      <KeyboardProvider>
        <AppSidebar />
        <NoteList />
        <NoteEditor />
        <KeyboardShortcuts />
        <SettingsModal />
      </KeyboardProvider>
    </div>
  )
}

export default App
