import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'

import { Folder } from 'constants/enums'
import { folderMap } from 'constants/index'
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
  const dispatch = useDispatch()
  const { dark } = useSelector((state: RootState) => state.themeState)
  const { activeFolder, activeCategoryId } = useSelector((state: RootState) => state.noteState)
  const { categories } = useSelector((state: RootState) => state.categoryState)

  const activeCategory = categories.find(({ id }) => id === activeCategoryId)

  const _loadNotes = () => {
    dispatch(loadNotes())
  }
  const _loadCategories = () => {
    dispatch(loadCategories())
  }

  useEffect(_loadNotes, [])
  useEffect(_loadCategories, [])

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {' '}
          {activeFolder === Folder.CATEGORY
            ? activeCategory && activeCategory.name
            : folderMap[activeFolder]}{' '}
          | TakeNote
        </title>
        <link rel="canonical" href="https://takenote.dev" />
      </Helmet>

      <div className={`app ${dark ? 'dark' : ''}`}>
        <TempStateProvider>
          <AppSidebar />
          <NoteList />
          <NoteEditor />
          <KeyboardShortcuts />
          <SettingsModal />
        </TempStateProvider>
      </div>
    </>
  )
}

export default App
