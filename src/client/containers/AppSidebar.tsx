import React from 'react'
import { Plus } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'
import { ActionButton } from '@/components/AppSidebar/ActionButton'
import { FolderOption } from '@/components/AppSidebar/FolderOption'
import { ScratchpadOption } from '@/components/AppSidebar/ScratchpadOption'
import { Folder, NotesSortKey } from '@/utils/enums'
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
import { togglePreviewMarkdown } from '@/slices/settings'
import { NoteItem } from '@/types'
import { newNoteHandlerHelper, getActiveNote } from '@/utils/helpers'
import { iconColor } from '@/utils/constants'

interface AppSidebarProps {
  activeCategoryId: string
  activeFolder: Folder
  activeNoteId: string
  notes: NoteItem[]
  previewMarkdown: boolean
  notesSortKey: NotesSortKey
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeCategoryId,
  activeFolder,
  activeNoteId,
  notes,
  previewMarkdown,
  notesSortKey,
}) => {
  const componentRef = React.useRef(
    <Plus
      size={18}
      className="action-button-icon"
      color={iconColor}
      aria-hidden="true"
      focusable="false"
    />
  )
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
  const _swapFolder = (sortOrderKey: NotesSortKey) => (folder: Folder) =>
    dispatch(swapFolder({ folder, sortOrderKey }))
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
      swapFolderHandler,
      _togglePreviewMarkdown,
      _addNote,
      _updateActiveNote,
      _updateSelectedNotes
    )
  const swapFolderHandler = _swapFolder(notesSortKey)

  const newNoteHandlerDecorator = React.useCallback(() => {
    newNoteHandler()
  }, [])

  return (
    <aside className="app-sidebar">
      <ActionButton
        dataTestID={TestID.SIDEBAR_ACTION_CREATE_NEW_NOTE}
        handler={newNoteHandlerDecorator}
        label={LabelText.CREATE_NEW_NOTE}
        text={LabelText.NEW_NOTE}
      >
        {componentRef.current}
      </ActionButton>
      <section className="app-sidebar-main">
        <ScratchpadOption
          active={activeFolder === Folder.SCRATCHPAD}
          swapFolder={swapFolderHandler}
        />
        <FolderOption
          active={activeFolder === Folder.ALL}
          swapFolder={swapFolderHandler}
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
          swapFolder={swapFolderHandler}
          addNoteType={_assignFavoriteToNotes}
        />
        <FolderOption
          active={activeFolder === Folder.TRASH}
          text={LabelText.TRASH}
          dataTestID={TestID.FOLDER_TRASH}
          folder={Folder.TRASH}
          swapFolder={swapFolderHandler}
          addNoteType={_assignTrashToNotes}
        />
        <CategoryList />
      </section>
    </aside>
  )
}
