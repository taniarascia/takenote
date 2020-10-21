import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import SplitPane from 'react-split-pane'

import { AppSidebar } from '@/containers/AppSidebar'
import { KeyboardShortcuts } from '@/containers/KeyboardShortcuts'
import { NoteEditor } from '@/containers/NoteEditor'
import { NoteList } from '@/containers/NoteList'
import { SettingsModal } from '@/containers/SettingsModal'
import { TempStateProvider } from '@/contexts/TempStateContext'
import { useInterval, useBeforeUnload } from '@/utils/hooks'
import { getWebsiteTitle, determineAppClass, getActiveCategory } from '@/utils/helpers'
import { loadCategories, swapCategories } from '@/slices/category'
import { loadNotes } from '@/slices/note'
import { sync } from '@/slices/sync'
import { loadSettings } from '@/slices/settings'
import { NoteItem, CategoryItem } from '@/types'
import { getSettings, getNotes, getCategories, getSync } from '@/selectors'

export const TakeNoteApp: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { darkTheme, sidebarVisible } = useSelector(getSettings)
  const { activeFolder, activeCategoryId, notes } = useSelector(getNotes)
  const { categories } = useSelector(getCategories)
  const { pendingSync } = useSelector(getSync)

  const activeCategory = getActiveCategory(categories, activeCategoryId)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _loadNotes = () => dispatch(loadNotes())
  const _loadCategories = () => dispatch(loadCategories())
  const _loadSettings = () => dispatch(loadSettings())
  const _swapCategories = (categoryId: number, destinationId: number) =>
    dispatch(swapCategories({ categoryId, destinationId }))
  const _sync = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(sync({ notes, categories }))

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result

    if (!destination) return
    if (destination.droppableId === source.droppableId && destination.index === source.index) return

    switch (result.type) {
      case 'CATEGORY':
        _swapCategories(source.index, destination.index)
    }
  }

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    _loadNotes()
    _loadCategories()
    _loadSettings()
  }, [])

  useInterval(() => {
    _sync(notes, categories)
  }, 20000)

  useBeforeUnload((event: BeforeUnloadEvent) => (pendingSync ? event.preventDefault() : null))

  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{getWebsiteTitle(activeFolder, activeCategory)}</title>
        <link rel="canonical" href="https://takenote.dev" />
      </Helmet>

      <TempStateProvider>
        <div className={determineAppClass(darkTheme, sidebarVisible, activeFolder)}>
          <DragDropContext onDragEnd={onDragEnd}>
            <SplitPane split="vertical" minSize={150} maxSize={500} defaultSize={240}>
              <AppSidebar />
              <SplitPane split="vertical" minSize={200} maxSize={600} defaultSize={330}>
                <NoteList />
                <NoteEditor />
              </SplitPane>
            </SplitPane>
          </DragDropContext>
          <KeyboardShortcuts />
          <SettingsModal />
        </div>
      </TempStateProvider>
    </HelmetProvider>
  )
}
