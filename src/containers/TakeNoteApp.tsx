import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import axios from 'axios'

import { useAuth0 } from 'auth'
import { Folder } from 'constants/enums'
import { folderMap } from 'constants/index'
import AppSidebar from 'containers/AppSidebar'
import KeyboardShortcuts from 'containers/KeyboardShortcuts'
import NoteEditor from 'containers/NoteEditor'
import NoteList from 'containers/NoteList'
import SettingsModal from 'containers/SettingsModal'
import { TempStateProvider } from 'contexts/TempStateContext'
import { useInterval } from 'helpers/hooks'
import { loadCategories } from 'slices/category'
import { loadNotes } from 'slices/note'
import { syncState } from 'slices/sync'
import { loadSettings } from 'slices/settings'
import { RootState, NoteItem, CategoryItem } from 'types'

const TakeNoteApp: React.FC = () => {
  const dispatch = useDispatch()
  const { darkTheme } = useSelector((state: RootState) => state.settingsState)
  const { activeFolder, activeCategoryId, notes } = useSelector(
    (state: RootState) => state.noteState
  )
  const { categories } = useSelector((state: RootState) => state.categoryState)
  const activeCategory = categories.find(({ id }) => id === activeCategoryId)
  const { getUser } = useAuth0()

  const _loadNotes = () => {
    dispatch(loadNotes())
  }
  const _loadCategories = () => {
    dispatch(loadCategories())
  }
  const _loadSettings = () => {
    dispatch(loadSettings())
  }

  const getRepos = () => {
    const fn = async () => {
      const user = await getUser()
      // this is my serverless endpoint , should be set in the config
      const githubToken = await axios.post(
        'https://gnf8fv6tue.execute-api.us-east-1.amazonaws.com/dev/auth0',
        {
          user: user.sub,
        }
      )
      try {
        const response = await axios.get('https://api.github.com/user/repos', {
          headers: {
            Authorization: 'token ' + githubToken.data.token,
          },
        })
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    fn()
  }

  useEffect(_loadNotes, [])
  useEffect(_loadCategories, [])
  useEffect(_loadSettings, [])
  useEffect(getRepos, [])

  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }))

  useInterval(() => {
    _syncState(notes, categories)
  }, 20000)

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {activeFolder === Folder.CATEGORY
            ? activeCategory
              ? `${activeCategory.name} | TakeNote`
              : `TakeNote`
            : `${folderMap[activeFolder]} | TakeNote`}
        </title>
        <link rel="canonical" href="https://takenote.dev" />
      </Helmet>

      <TempStateProvider>
        <div className={`app ${darkTheme ? 'dark' : ''}`}>
          <AppSidebar />
          <NoteList />
          <NoteEditor />
          <KeyboardShortcuts />
          <SettingsModal />
        </div>
      </TempStateProvider>
    </HelmetProvider>
  )
}

export default TakeNoteApp
