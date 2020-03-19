import uuid from 'uuid/v4'
import React, { useState, useRef, useEffect } from 'react'
import {
  Loader,
  Folder as FolderIcon,
  Plus,
  Settings,
  RefreshCw,
  MoreHorizontal,
} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { LabelText } from '@resources/LabelText'
import { TestID } from '@resources/TestID'

import { ActionButton } from '@/components/AppSidebar/ActionButton'
import { AddCategoryButton } from '@/components/AppSidebar/AddCategoryButton'
import { AddCategoryForm } from '@/components/AppSidebar/AddCategoryForm'
import { LastSyncedNotification } from '@/components/AppSidebar/LastSyncedNotification'
import { AllNotesOption } from '@/components/AppSidebar/AllNotesOption'
import { FolderOption } from '@/components/AppSidebar/FolderOption'
import { ScratchpadOption } from '@/components/AppSidebar/ScratchpadOption'
import { Folder, ContextMenuEnum } from '@/utils/enums'
import { iconColor } from '@/utils/constants'
import { useTempState } from '@/contexts/TempStateContext'
import { ContextMenu } from '@/containers/ContextMenu'
import {
  addCategory,
  categoryDragEnter,
  categoryDragLeave,
  updateCategory,
  setCategoryEdit,
} from '@/slices/category'
import {
  addCategoryToNote,
  addNote,
  updateActiveCategoryId,
  swapFolder,
  updateActiveNote,
  addFavoriteNote,
  addTrashedNote,
  updateSelectedNotes,
} from '@/slices/note'
import { toggleSettingsModal, togglePreviewMarkdown } from '@/slices/settings'
import { syncState } from '@/slices/sync'
import { getSettings, getNotes, getCategories, getSync } from '@/selectors'
import { CategoryItem, NoteItem, ReactDragEvent, ReactSubmitEvent, ReactMouseEvent } from '@/types'
import {
  newNoteHandlerHelper,
  shouldOpenContextMenu,
  determineCategoryClass,
  getActiveNote,
} from '@/utils/helpers'

export const AppSidebar: React.FC = () => {
  // ===========================================================================
  // Selectors
  // ===========================================================================

  const {
    categories,
    editingCategory: { id: editingCategoryId, tempName: tempCategoryName },
  } = useSelector(getCategories)
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
  const _updateActiveCategoryId = (categoryId: string) =>
    dispatch(updateActiveCategoryId(categoryId))
  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder))
  const _addCategory = (category: CategoryItem) => dispatch(addCategory(category))
  const _categoryDragEnter = (category: CategoryItem) => dispatch(categoryDragEnter(category))
  const _categoryDragLeave = (category: CategoryItem) => dispatch(categoryDragLeave(category))
  const _updateCategory = (category: CategoryItem) => dispatch(updateCategory(category))
  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }))
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _togglePreviewMarkdown = () => dispatch(togglePreviewMarkdown())
  const _addTrashedNote = (noteId: string) => dispatch(addTrashedNote(noteId))
  const _addFavoriteNote = (noteId: string) => dispatch(addFavoriteNote(noteId))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))
  const _setCategoryEdit = (categoryId: string, tempName: string) =>
    dispatch(setCategoryEdit({ id: categoryId, tempName }))

  // ===========================================================================
  // Refs
  // ===========================================================================
  const contextMenuRef = useRef<HTMLDivElement>(null)

  // ===========================================================================
  // State
  // ===========================================================================
  const [optionsId, setOptionsId] = useState('')
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 })

  // ===========================================================================
  // Context
  // ===========================================================================
  const { addingTempCategory, setAddingTempCategory } = useTempState()

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

  const resetTempCategory = () => {
    setAddingTempCategory(false)
    _setCategoryEdit('', '')
  }

  const onSubmitNewCategory = (event: ReactSubmitEvent): void => {
    event.preventDefault()

    const category = { id: uuid(), name: tempCategoryName.trim(), draggedOver: false }

    if (categories.find(cat => cat.name === category.name) || category.name === '') {
      resetTempCategory()
    } else {
      _addCategory(category)
      resetTempCategory()
    }
  }

  const onSubmitUpdateCategory = (event: ReactSubmitEvent): void => {
    event.preventDefault()

    const category = { id: editingCategoryId, name: tempCategoryName.trim(), draggedOver: false }

    if (categories.find(cat => cat.name === category.name) || category.name === '') {
      resetTempCategory()
    } else {
      _updateCategory(category)
      resetTempCategory()
    }
  }

  const handleCategoryMenuClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | ReactMouseEvent,
    categoryId: string = ''
  ) => {
    const clicked = event.target

    // Make sure we aren't getting any null values .. any element clicked should be a sub-class of element
    if (!clicked) return

    if (shouldOpenContextMenu(clicked as Element)) {
      if ('clientX' in event && 'clientY' in event) {
        setOptionsPosition({ x: event.clientX, y: event.clientY })
      }
    }

    event.stopPropagation()

    if (contextMenuRef?.current?.contains(clicked as HTMLDivElement)) {
      return
    } else {
      setOptionsId(!optionsId || optionsId !== categoryId ? categoryId : '')
    }
  }

  const handleCategoryRightClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | ReactMouseEvent,
    categoryId: string = ''
  ) => {
    event.preventDefault()
    handleCategoryMenuClick(event, categoryId)
  }

  const syncNotesHandler = () => _syncState(notes, categories)
  const settingsHandler = () => _toggleSettingsModal()

  // ===========================================================================
  // Hooks
  // ===========================================================================

  useEffect(() => {
    document.addEventListener('mousedown', handleCategoryMenuClick)
    return () => {
      document.removeEventListener('mousedown', handleCategoryMenuClick)
    }
  })

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
          <AllNotesOption active={activeFolder === Folder.ALL} swapFolder={_swapFolder} />
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
          <Droppable type="CATEGORY" droppableId="Category list">
            {droppableProvided => (
              <div
                {...droppableProvided.droppableProps}
                ref={droppableProvided.innerRef}
                className="category-list"
                aria-label="Category list"
              >
                {categories.map((category, index) => {
                  return (
                    <Draggable key={category.id} draggableId={category.id} index={index}>
                      {(draggableProvided, snapshot) => (
                        <div
                          {...draggableProvided.dragHandleProps}
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          data-testid={TestID.CATEGORY_LIST_DIV}
                          className={determineCategoryClass(
                            category,
                            snapshot.isDragging,
                            activeCategoryId
                          )}
                          onClick={() => {
                            const notesForNewCategory = notes.filter(
                              note => !note.trash && note.category === category.id
                            )
                            const newNoteId =
                              notesForNewCategory.length > 0 ? notesForNewCategory[0].id : ''
                            if (category.id !== activeCategoryId) {
                              _updateActiveCategoryId(category.id)
                              _updateActiveNote(newNoteId, false)
                            }
                          }}
                          onDoubleClick={() => {
                            _setCategoryEdit(category.id, category.name)
                          }}
                          onBlur={() => {
                            _setCategoryEdit('', '')
                          }}
                          onDrop={event => {
                            event.preventDefault()

                            _addCategoryToNote(category.id, event.dataTransfer.getData('text'))
                            _categoryDragLeave(category)
                          }}
                          onDragOver={(event: ReactDragEvent) => event.preventDefault()}
                          onDragEnter={() => _categoryDragEnter(category)}
                          onDragLeave={() => _categoryDragLeave(category)}
                          onContextMenu={event => handleCategoryRightClick(event, category.id)}
                        >
                          <form
                            className="category-list-name"
                            onSubmit={event => {
                              event.preventDefault()
                              _setCategoryEdit('', '')
                              onSubmitUpdateCategory(event)

                              if (optionsId) setOptionsId('')
                            }}
                          >
                            <FolderIcon size={15} className="app-sidebar-icon" color={iconColor} />
                            {editingCategoryId === category.id ? (
                              <input
                                data-testid={TestID.CATEGORY_EDIT}
                                className="category-edit"
                                type="text"
                                autoFocus
                                maxLength={20}
                                value={tempCategoryName}
                                onChange={event => {
                                  _setCategoryEdit(editingCategoryId, event.target.value)
                                }}
                                onBlur={event => onSubmitUpdateCategory(event)}
                              />
                            ) : (
                              category.name
                            )}
                          </form>
                          <div
                            data-testid={TestID.MOVE_CATEGORY}
                            className={
                              optionsId === category.id
                                ? 'category-options active'
                                : 'category-options'
                            }
                            onClick={event => handleCategoryMenuClick(event, category.id)}
                          >
                            <MoreHorizontal size={15} className="context-menu-action" />
                          </div>
                          {optionsId === category.id && (
                            <ContextMenu
                              contextMenuRef={contextMenuRef}
                              item={category}
                              optionsPosition={optionsPosition}
                              setOptionsId={setOptionsId}
                              type={ContextMenuEnum.CATEGORY}
                            />
                          )}
                        </div>
                      )}
                    </Draggable>
                  )
                })}
                {droppableProvided.placeholder}
              </div>
            )}
          </Droppable>
          {addingTempCategory ? (
            <AddCategoryForm
              dataTestID={TestID.NEW_CATEGORY_FORM}
              submitHandler={onSubmitNewCategory}
              changeHandler={_setCategoryEdit}
              resetHandler={resetTempCategory}
              editingCategoryId={editingCategoryId}
              tempCategoryName={tempCategoryName}
            />
          ) : (
            <AddCategoryButton
              dataTestID={TestID.ADD_CATEGORY_BUTTON}
              handler={setAddingTempCategory}
              label={LabelText.ADD_CATEGORY}
            />
          )}
        </section>
      </aside>
      {lastSynced && <LastSyncedNotification datetime={lastSynced} />}
    </>
  )
}
