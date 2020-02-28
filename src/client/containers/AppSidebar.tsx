import uuid from 'uuid/v4'
import React, { useState, useRef, useEffect } from 'react'
import { Loader, Folder as FolderIcon, Plus, Settings, RefreshCw, X, Move } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Droppable, Draggable } from 'react-beautiful-dnd'

import { StringEnum } from '@resources/StringEnum'

import { ActionButton } from '@/components/AppSidebar/ActionButton'
import { LastSyncedNotification } from '@/components/AppSidebar/LastSyncedNotification'
import { AllNotesOption } from '@/components/AppSidebar/AllNotesOption'
import { FolderOption } from '@/components/AppSidebar/FolderOption'
import { Folder, ContextMenuEnum } from '@/utils/enums'
import { iconColor } from '@/utils/constants'
import { useTempState } from '@/contexts/TempStateContext'
import { ContextMenu } from '@/containers/ContextMenu'
import {
  addCategory,
  categoryDragEnter,
  categoryDragLeave,
  updateCategory,
  deleteCategory,
  setCategoryEdit,
} from '@/slices/category'
import {
  addCategoryToNote,
  addNote,
  pruneCategoryFromNotes,
  swapCategory,
  swapFolder,
  swapNote,
  addFavoriteNote,
  addTrashedNote,
} from '@/slices/note'
import { toggleSettingsModal, togglePreviewMarkdown } from '@/slices/settings'
import { syncState } from '@/slices/sync'
import { getSettings, getNotes, getCategories, getSync } from '@/selectors'
import { CategoryItem, NoteItem, ReactDragEvent, ReactSubmitEvent, ReactMouseEvent } from '@/types'
import { newNoteHandlerHelper, shouldOpenContextMenu } from '@/utils/helpers'

export const AppSidebar: React.FC = () => {
  const {
    categories,
    editingCategory: { id: editingCategoryId, tempName: tempCategoryName },
  } = useSelector(getCategories)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(getNotes)
  const { previewMarkdown } = useSelector(getSettings)
  const { syncing, lastSynced } = useSelector(getSync)

  const contextMenuRef = useRef<HTMLDivElement>(null)

  const dispatch = useDispatch()
  const _addNote = (note: NoteItem) => dispatch(addNote(note))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))
  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder))
  const _addCategory = (category: CategoryItem) => dispatch(addCategory(category))
  const _categoryDragEnter = (category: CategoryItem) => dispatch(categoryDragEnter(category))
  const _categoryDragLeave = (category: CategoryItem) => dispatch(categoryDragLeave(category))
  const _updateCategory = (category: CategoryItem) => dispatch(updateCategory(category))
  const _deleteCategory = (categoryId: string) => dispatch(deleteCategory(categoryId))
  const _pruneCategoryFromNotes = (categoryId: string) =>
    dispatch(pruneCategoryFromNotes(categoryId))
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

  const [optionsId, setOptionsId] = useState('')
  const [optionsPosition, setOptionsPosition] = useState({ x: 0, y: 0 })

  const { addingTempCategory, setAddingTempCategory } = useTempState()

  useEffect(() => {
    document.addEventListener('mousedown', handleCategoryMenuClick)
    return () => {
      document.removeEventListener('mousedown', handleCategoryMenuClick)
    }
  })

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  const newNoteHandler = () =>
    newNoteHandlerHelper(
      activeFolder,
      previewMarkdown,
      activeNote,
      activeCategoryId,
      _swapFolder,
      _togglePreviewMarkdown,
      _addNote,
      _swapNote
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

  const determineCategoryClass = (category: CategoryItem, isDragging: boolean) => {
    if (category.draggedOver) {
      return 'category-list-each dragged-over'
    } else if (category.id === activeCategoryId) {
      return 'category-list-each active'
    } else if (isDragging) {
      return 'category-list-each dragging'
    } else {
      return 'category-list-each'
    }
  }

  const activeNote = notes.find(note => note.id === activeNoteId)

  return (
    <>
      <aside className="app-sidebar">
        <section className="app-sidebar-actions">
          <ActionButton
            dataTestID="sidebar-action-create-new-note"
            handler={newNoteHandler}
            icon={Plus}
            label={StringEnum.CREATE_NEW_NOTE}
          />
          <ActionButton
            dataTestID="sidebar-action-sync-notes"
            handler={syncNotesHandler}
            icon={syncing ? Loader : RefreshCw}
            label={StringEnum.SYNC_NOTES}
          />
          <ActionButton
            dataTestID="sidebar-action-settings"
            handler={settingsHandler}
            icon={Settings}
            label={StringEnum.SETTINGS}
          />
        </section>
        <section className="app-sidebar-main">
          <AllNotesOption active={activeFolder === Folder.ALL} swapFolder={_swapFolder} />
          <FolderOption
            active={activeFolder === Folder.FAVORITES}
            text={StringEnum.FAVORITES}
            dataTestID="favorites"
            folder={Folder.FAVORITES}
            swapFolder={_swapFolder}
            addNoteType={_addFavoriteNote}
          />
          <FolderOption
            active={activeFolder === Folder.TRASH}
            text={StringEnum.TRASH}
            dataTestID="trash"
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
                          {...draggableProvided.draggableProps}
                          ref={draggableProvided.innerRef}
                          data-testid="category-list-div"
                          className={determineCategoryClass(category, snapshot.isDragging)}
                          onClick={() => {
                            const notesForNewCategory = notes.filter(
                              note => !note.trash && note.category === category.id
                            )
                            const newNoteId =
                              notesForNewCategory.length > 0 ? notesForNewCategory[0].id : ''
                            if (category.id !== activeCategoryId) {
                              _swapCategory(category.id)
                              _swapNote(newNoteId)
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
                                data-testid="category-edit"
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
                          <div data-testid="category-options" className="category-options">
                            <div
                              {...draggableProvided.dragHandleProps}
                              data-testid="move-category"
                              aria-label={StringEnum.MOVE_CATEGORY}
                            >
                              <Move size={16} />
                            </div>
                            <X
                              onClick={() => {
                                const notesNotTrash = notes.filter(note => !note.trash)
                                const newNoteId =
                                  notesNotTrash.length > 0 ? notesNotTrash[0].id : ''

                                _deleteCategory(category.id)
                                _pruneCategoryFromNotes(category.id)
                                _swapFolder(Folder.ALL)
                                _swapNote(newNoteId)
                              }}
                              data-testid="remove-category"
                              size={16}
                              aria-label={StringEnum.REMOVE_CATEGORY}
                            />
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
            <form
              data-testid="new-category-form"
              className="category-form"
              onSubmit={onSubmitNewCategory}
            >
              <input
                data-testid="new-category-label"
                aria-label="Category name"
                type="text"
                autoFocus
                maxLength={20}
                placeholder="Start typing..."
                onChange={event => {
                  _setCategoryEdit(editingCategoryId, event.target.value)
                }}
                onBlur={event => {
                  if (!tempCategoryName || tempCategoryName.trim() === '') {
                    resetTempCategory()
                  } else {
                    onSubmitNewCategory(event)
                  }
                }}
              />
            </form>
          ) : (
            <button
              data-testid="add-category-button"
              className="category-button"
              onClick={newTempCategoryHandler}
              aria-label="{{StringEnum.ADD_CATEGORY}}"
            >
              <Plus size={15} color={iconColor} />
              {StringEnum.ADD_CATEGORY}
            </button>
          )}
        </section>
      </aside>
      {lastSynced && <LastSyncedNotification datetime={lastSynced} />}
    </>
  )
}
