import React from 'react'
import { Plus, Settings } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'
import { ActionButton } from '@/components/AppSidebar/ActionButton'
import { FolderOption } from '@/components/AppSidebar/FolderOption'
import { ScratchpadOption } from '@/components/AppSidebar/ScratchpadOption'
import { Folder } from '@/utils/enums'
import { CategoryList } from '@/containers/CategoryList'
import {
  addNote,
  swapFolder,
  updateActiveNote,
  assignFavoriteToNotes,
  assignTrashToNotes,
  updateSelectedNotes,
  unassignTrashFromNotes,
} from '@/slices/note'
import { toggleSettingsModal, togglePreviewMarkdown } from '@/slices/settings'
import { getSettings, getNotes, getAuth } from '@/selectors'
import { NoteItem } from '@/types'
import { newNoteHandlerHelper, getActiveNote } from '@/utils/helpers'

export const AppSidebar: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(getNotes)
  const { previewMarkdown } = useSelector(getSettings)
  const { currentUser } = useSelector(getAuth)

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
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _assignTrashToNotes = (noteId: string) => dispatch(assignTrashToNotes(noteId))
  const _unassignTrashFromNotes = (noteId: string) => dispatch(unassignTrashFromNotes(noteId))
  const _assignFavoriteToNotes = (noteId: string) => dispatch(assignFavoriteToNotes(noteId))

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

  const settingsHandler = () => _toggleSettingsModal()

  return (
    <aside className="app-sidebar">
      <ActionButton
        dataTestID={TestID.SIDEBAR_ACTION_CREATE_NEW_NOTE}
        handler={newNoteHandler}
        icon={Plus}
        label={LabelText.CREATE_NEW_NOTE}
        text="New note"
      />
      <section className="app-sidebar-main">
        <ScratchpadOption active={activeFolder === Folder.SCRATCHPAD} swapFolder={_swapFolder} />
        <FolderOption
          active={activeFolder === Folder.ALL}
          swapFolder={_swapFolder}
          text={LabelText.NOTES}
          dataTestID={TestID.FOLDER_NOTES}
          folder={Folder.ALL}
          addNoteType={_unassignTrashFromNotes}
        />
        <FolderOption
          active={activeFolder === Folder.FAVORITES}
          text={LabelText.FAVORITES}
          dataTestID={TestID.FOLDER_FAVORITES}
          folder={Folder.FAVORITES}
          swapFolder={_swapFolder}
          addNoteType={_assignFavoriteToNotes}
        />
        <FolderOption
          active={activeFolder === Folder.TRASH}
          text={LabelText.TRASH}
          dataTestID={TestID.FOLDER_TRASH}
          folder={Folder.TRASH}
          swapFolder={_swapFolder}
          addNoteType={_assignTrashToNotes}
        />
        <CategoryList />
      </section>
      <button
        className="app-sidebar-settings"
        data-test-id={TestID.SIDEBAR_ACTION_SETTINGS}
        onClick={settingsHandler}
        aria-label={LabelText.SETTINGS}
      >
        <div>
          <img src={currentUser.avatar_url} alt="Profile" className="user-avatar" />
        </div>
        <div>
          <div className="user-name">{currentUser.name}</div>
          <div className="user-subtitle">Settings</div>
        </div>
        <div className="user-settings-icon">
          <Settings size={16} />
        </div>
      </button>
    </aside>
  )
}
