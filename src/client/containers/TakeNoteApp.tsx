import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'

import { AppSidebar } from '@/containers/AppSidebar'
import { KeyboardShortcuts } from '@/containers/KeyboardShortcuts'
import { NoteEditor } from '@/containers/NoteEditor'
import { NoteList } from '@/containers/NoteList'
import { SettingsModal } from '@/containers/SettingsModal'
import { TempStateProvider } from '@/contexts/TempStateContext'
import { useInterval } from '@/helpers/hooks'
import { getWebsiteTitle, determineTheme } from '@/helpers'
import { loadCategories } from '@/slices/category'
import { loadNotes } from '@/slices/note'
import { syncState } from '@/slices/sync'
import { loadSettings } from '@/slices/settings'
import { NoteItem, CategoryItem } from '@/types'
import { getSettings, getNotes, getCategories, getSync } from '@/selectors'

export const TakeNoteApp: React.FC = () => {
  const { darkTheme } = useSelector(getSettings)
  const { activeFolder, activeCategoryId, notes } = useSelector(getNotes)
  const { categories } = useSelector(getCategories)

  const dispatch = useDispatch()
  const _loadNotes = () => dispatch(loadNotes())
  const _loadCategories = () => dispatch(loadCategories())
  const _loadSettings = () => dispatch(loadSettings())
  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }))

  const activeCategory = categories.find(({ id }) => id === activeCategoryId)

  useEffect(() => {
    _loadNotes()
    _loadCategories()
    _loadSettings()
  }, [])

  useInterval(() => {
    _syncState(notes, categories)
  }, 20000)

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getWebsiteTitle(activeFolder, activeCategory)}</title>
        <link rel="canonical" href="https://takenote.dev" />
      </Helmet>

      <TempStateProvider>
        <div className={determineTheme(darkTheme)}>
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
