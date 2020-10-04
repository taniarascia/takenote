import React from 'react'
import { Loader, Plus, Settings, RefreshCw } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { ActionButton } from '@/components/AppSidebar/ActionButton'
import { LastSyncedNotification } from '@/components/AppSidebar/LastSyncedNotification'
import { FolderOption } from '@/components/AppSidebar/FolderOption'
import { ScratchpadOption } from '@/components/AppSidebar/ScratchpadOption'
import { Folder } from '@/utils/enums'
import { CategoryList } from '@/containers/CategoryList'
import {
  addNote,
  swapFolder,
  updateActiveNote,
  addFavoriteNote,
  addTrashedNote,
  toggleTrashedNote,
  updateSelectedNotes,
} from '@/slices/note'
import { toggleSettingsModal, togglePreviewMarkdown } from '@/slices/settings'
import { syncState } from '@/slices/sync'
import { getSettings, getNotes, getCategories, getSync } from '@/selectors'
import { CategoryItem, NoteItem } from '@/types'
import { newNoteHandlerHelper, getActiveNote } from '@/utils/helpers'

export const AppSidebar: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { categories } = useSelector(getCategories)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(getNotes)
  const { previewMarkdown } = useSelector(getSettings)
  const { syncing, lastSynced } = useSelector(getSync)

  const activeNote = getActiveNote(notes, activeNoteId)

  // ===========================================================================
  // Dispatch
  // ===========================================================================

  const dispatch = useDispatch()

  const _addNote = (note: NoteItem) => dispatch(addNote(note))
  const _updateActiveNote = (noteId: string, multiSelect: boolean) =>
    dispatch(updateActiveNote({ noteId, multiSelect }))
  const _updateSelectedNotes = (noteId: string, multiSelect: boolean) =>
    dispatch(updateSelectedNotes({ noteId, multiSelect }))
  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder))
  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }))
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _addTrashedNote = (noteId: string) => dispatch(addTrashedNote(noteId))
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _addFavoriteNote = (noteId: string) => dispatch(addFavoriteNote(noteId))

  // ===========================================================================
  // Handlers
  // ===========================================================================

  const newNoteHandler = () =>
    newNoteHandlerHelper(
      activeFolder,
      previewMarkdown,
      activeNote,
      activeCategoryId,
      _swapFolder,
      _togglePreviewMarkdown,
      _addNote,
      _updateActiveNote,
      _updateSelectedNotes
    )

  const syncNotesHandler = () => _syncState(notes, categories)
  const settingsHandler = () => _toggleSettingsModal()

  return (
    <>
      <aside className="app-sidebar">
        <section className="app-sidebar-actions">
          <ActionButton
            dataTestID={TestID.SIDEBAR_ACTION_CREATE_NEW_NOTE}
            handler={newNoteHandler}
            icon={Plus}
            label={LabelText.CREATE_NEW_NOTE}
          />
          <ActionButton
            dataTestID={TestID.SIDEBAR_ACTION_SYNC_NOTES}
            handler={syncNotesHandler}
            icon={syncing ? Loader : RefreshCw}
            label={LabelText.SYNC_NOTES}
          />
          <ActionButton
            dataTestID={TestID.SIDEBAR_ACTION_SETTINGS}
            handler={settingsHandler}
            icon={Settings}
            label={LabelText.SETTINGS}
          />
        </section>
        <section className="app-sidebar-main">
          <ScratchpadOption active={activeFolder === Folder.SCRATCHPAD} swapFolder={_swapFolder} />
          <FolderOption
            active={activeFolder === Folder.ALL}
            swapFolder={_swapFolder}
            text={LabelText.NOTES}
            dataTestID={TestID.FOLDER_NOTES}
            folder={Folder.ALL}
            addNoteType={_toggleTrashedNote}
          />
          <FolderOption
            active={activeFolder === Folder.FAVORITES}
            text={LabelText.FAVORITES}
            dataTestID={TestID.FOLDER_FAVORITES}
            folder={Folder.FAVORITES}
            swapFolder={_swapFolder}
            addNoteType={_addFavoriteNote}
          />
          <FolderOption
            active={activeFolder === Folder.TRASH}
            text={LabelText.TRASH}
            dataTestID={TestID.FOLDER_TRASH}
            folder={Folder.TRASH}
            swapFolder={_swapFolder}
            addNoteType={_addTrashedNote}
          />
          <div className="category-title">
            <h2>Categories</h2>
          </div>
          <CategoryList />
        </section>
      </aside>
      {lastSynced && <LastSyncedNotification datetime={lastSynced} />}
    </>
  )
}
