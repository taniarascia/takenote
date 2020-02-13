import uuid from 'uuid/v4'
import React, { useState } from 'react'
import { Loader, Folder as FolderIcon, Plus, Settings, RefreshCw, X } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { ActionButton } from '@/components/AppSidebar/ActionButton'
import { LastSyncedNotification } from '@/components/AppSidebar/LastSyncedNotification'
import { AllNotesOption } from '@/components/AppSidebar/AllNotesOption'
import { FolderOption } from '@/components/AppSidebar/FolderOption'
import { Folder } from '@/constants/enums'
import { iconColor } from '@/constants/index'
import { useTempState } from '@/contexts/TempStateContext'
import {
  addCategory,
  categoryDragEnter,
  categoryDragLeave,
  updateCategory,
  deleteCategory,
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
import { CategoryItem, NoteItem, ReactDragEvent, ReactSubmitEvent } from '@/types'
import { newNoteHandlerHelper } from '@/helpers'

export const AppSidebar: React.FC = () => {
  const { categories } = useSelector(getCategories)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(getNotes)
  const { previewMarkdown } = useSelector(getSettings)
  const { syncing, lastSynced } = useSelector(getSync)

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

  const [editingCategoryId, setEditingCategoryId] = useState('')
  const [tempCategoryName, setTempCategoryName] = useState('')

  const { addingTempCategory, setAddingTempCategory } = useTempState()

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
    setTempCategoryName('')
    setAddingTempCategory(false)
    setEditingCategoryId('')
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

  const syncNotesHandler = () => _syncState(notes, categories)
  const settingsHandler = () => _toggleSettingsModal()

  const determineCategoryClass = (category: CategoryItem) => {
    if (category.id === activeCategoryId) {
      return 'category-list-each active'
    } else if (category.draggedOver) {
      return 'category-list-each dragged-over'
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
            label="Create new note"
          />
          <ActionButton
            dataTestID="sidebar-action-sync-notes"
            handler={syncNotesHandler}
            icon={syncing ? Loader : RefreshCw}
            label="Sync notes"
          />
          <ActionButton
            dataTestID="sidebar-action-settings"
            handler={settingsHandler}
            icon={Settings}
            label="Settings"
          />
        </section>
        <section className="app-sidebar-main">
          <AllNotesOption active={activeFolder === Folder.ALL} swapFolder={_swapFolder} />
          <FolderOption
            active={activeFolder === Folder.FAVORITES}
            text="Favorites"
            dataTestID="favorites"
            folder={Folder.FAVORITES}
            swapFolder={_swapFolder}
            addNoteType={_addFavoriteNote}
          />
          <FolderOption
            active={activeFolder === Folder.TRASH}
            text="Trash"
            dataTestID="trash"
            folder={Folder.TRASH}
            swapFolder={_swapFolder}
            addNoteType={_addTrashedNote}
          />
          <div className="category-title">
            <h2>Categories</h2>
          </div>
          <div className="category-list" aria-label="Category list">
            {categories.map(category => {
              return (
                <div
                  data-testid="category-list-div"
                  key={category.id}
                  className={determineCategoryClass(category)}
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
                    setEditingCategoryId(category.id)
                    setTempCategoryName(category.name)
                  }}
                  onBlur={() => {
                    setEditingCategoryId('')
                  }}
                  onDrop={event => {
                    event.preventDefault()

                    _addCategoryToNote(category.id, event.dataTransfer.getData('text'))
                    _categoryDragLeave(category)
                  }}
                  onDragOver={(event: ReactDragEvent) => event.preventDefault()}
                  onDragEnter={() => _categoryDragEnter(category)}
                  onDragLeave={() => _categoryDragLeave(category)}
                >
                  <form
                    className="category-list-name"
                    onSubmit={event => {
                      event.preventDefault()
                      setEditingCategoryId('')
                      onSubmitUpdateCategory(event)
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
                          setTempCategoryName(event.target.value)
                        }}
                        onBlur={() => resetTempCategory()}
                      />
                    ) : (
                      category.name
                    )}
                  </form>
                  <div
                    data-testid="category-options"
                    className="category-options"
                    onClick={() => {
                      const notesNotTrash = notes.filter(note => !note.trash)
                      const newNoteId = notesNotTrash.length > 0 ? notesNotTrash[0].id : ''

                      _deleteCategory(category.id)
                      _pruneCategoryFromNotes(category.id)
                      _swapFolder(Folder.ALL)
                      _swapNote(newNoteId)
                    }}
                  >
                    <X data-testid="remove-category" size={12} aria-label="Remove category" />
                  </div>
                </div>
              )
            })}
          </div>
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
                placeholder="New category..."
                onChange={event => {
                  setTempCategoryName(event.target.value)
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
              aria-label="Add Category"
            >
              <Plus size={15} color={iconColor} />
              Add Category
            </button>
          )}
        </section>
      </aside>
      {lastSynced && <LastSyncedNotification datetime={lastSynced} />}
    </>
  )
}
