import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AppSidebar from 'containers/AppSidebar'
import KeyboardShortcuts from 'containers/KeyboardShortcuts'
import NoteEditor from 'containers/NoteEditor'
import NoteList from 'containers/NoteList'
import SettingsModal from 'containers/SettingsModal'
import { TempStateProvider } from 'contexts/TempStateContext'
import { loadCategories } from 'slices/category'
import { loadNotes } from 'slices/note'
import { RootState } from 'types'

const App: React.FC = () => {
  const { dark } = useSelector((state: RootState) => state.themeState)

  const dispatch = useDispatch()

  const _loadNotes = () => {
    dispatch(loadNotes())
  }
  const _loadCategories = () => {
    dispatch(loadCategories())
  }

  useEffect(_loadNotes, [])
  useEffect(_loadCategories, [])

  return (
    <div className={`app ${dark ? 'dark' : ''}`}>
      <TempStateProvider>
        <AppSidebar />
        <NoteList />
        <NoteEditor />
        <KeyboardShortcuts />
        <SettingsModal />
      </TempStateProvider>
    </div>
  )
}

export default App
