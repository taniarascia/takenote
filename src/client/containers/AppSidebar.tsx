import uuid from 'uuid/v4'
import React, { useState } from 'react'
import {
  Book,
  Star,
  Folder as FolderIcon,
  Loader,
  Plus,
  Settings,
  Trash2,
  UploadCloud,
  X,
  Check,
} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'

import AppSidebarAction from '@/components/AppSidebarAction'
import { Folder } from '@/constants/enums'
import { iconColor } from '@/constants/index'
import { useTempState } from '@/contexts/TempStateContext'
import { newNoteHandlerHelper } from '@/helpers'
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
  toggleFavoriteNote,
  toggleTrashedNote,
} from '@/slices/note'
import { toggleSettingsModal, togglePreviewMarkdown } from '@/slices/settings'
import { syncState } from '@/slices/sync'
import { CategoryItem, NoteItem, ReactDragEvent, ReactSubmitEvent, RootState } from '@/types'

const AppSidebar: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categoryState)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(
    (state: RootState) => state.noteState
  )
  const { previewMarkdown } = useSelector((state: RootState) => state.settingsState)

  const activeNote = notes.find(note => note.id === activeNoteId)

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
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _toggleFavoriteNote = (noteId: string) => dispatch(toggleFavoriteNote(noteId))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))

  const { addingTempCategory, setAddingTempCategory } = useTempState()

  const [editingCategoryId, setEditingCategoryId] = useState('')
  const [tempCategoryName, setTempCategoryName] = useState('')
  const [mainSectionDragState, setMainSectionDragState] = useState({
    All: false,
    FAVORITES: false,
    TRASH: false,
  })
  const { syncing, lastSynced } = useSelector((state: RootState) => state.syncState)

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

  const syncNotesHandler = () => {
    _syncState(notes, categories)
  }

  const settingsHandler = () => {
    _toggleSettingsModal()
  }

  const allowDrop = (event: ReactDragEvent) => {
    event.preventDefault()
  }

  const trashNoteHandler = (event: ReactDragEvent) => {
    event.preventDefault()

    _toggleTrashedNote(event.dataTransfer.getData('text'))
    setMainSectionDragState({ ...mainSectionDragState, TRASH: false })
  }

  const favoriteNoteHandler = (event: ReactDragEvent) => {
    event.preventDefault()

    _toggleFavoriteNote(event.dataTransfer.getData('text'))
    setMainSectionDragState({ ...mainSectionDragState, FAVORITES: false })
  }

  return (
    <>
      <aside className="app-sidebar">
        <section className="app-sidebar-actions">
          <AppSidebarAction
            dataTestID="create-new-note-sidebar-action"
            handler={newNoteHandler}
            icon={Plus}
            label="Create new note"
          />
          <AppSidebarAction
            dataTestID="sync-notes-sidebar-action"
            handler={syncNotesHandler}
            icon={syncing ? Loader : UploadCloud}
            label="Sync notes"
          />
          <AppSidebarAction
            dataTestID="settings-sidebar-action"
            handler={settingsHandler}
            icon={Settings}
            label="Settings"
          />
        </section>
        <section className="app-sidebar-main">
          <div
            data-testid="all-notes"
            className={`app-sidebar-link ${activeFolder === Folder.ALL ? 'active' : ''}`}
            onClick={() => {
              _swapFolder(Folder.ALL)
            }}
          >
            <Book size={15} className="app-sidebar-icon" color={iconColor} />
            All Notes
          </div>
          <div
            data-testid="favorites"
            className={`app-sidebar-link ${
              activeFolder === Folder.FAVORITES || mainSectionDragState.FAVORITES ? 'active' : ''
            }`}
            onClick={() => {
              _swapFolder(Folder.FAVORITES)
            }}
            onDrop={favoriteNoteHandler}
            onDragOver={allowDrop}
            onDragEnter={() =>
              setMainSectionDragState({ ...mainSectionDragState, FAVORITES: true })
            }
            onDragLeave={() =>
              setMainSectionDragState({ ...mainSectionDragState, FAVORITES: false })
            }
          >
            <Star size={15} className="app-sidebar-icon" color={iconColor} />
            Favorites
          </div>
          <div
            data-testid="trash"
            className={`app-sidebar-link ${
              activeFolder === Folder.TRASH || mainSectionDragState.TRASH ? 'active' : ''
            }`}
            onClick={() => {
              _swapFolder(Folder.TRASH)
            }}
            onDrop={trashNoteHandler}
            onDragOver={allowDrop}
            onDragEnter={() => setMainSectionDragState({ ...mainSectionDragState, TRASH: true })}
            onDragLeave={() => setMainSectionDragState({ ...mainSectionDragState, TRASH: false })}
          >
            <Trash2 size={15} className="app-sidebar-icon" color={iconColor} />
            Trash
          </div>

          <div className="category-title">
            <h2>Categories</h2>
          </div>
          <div className="category-list" aria-label="Category list">
            {categories.map(category => {
              return (
                <div
                  data-testid="category-list-div"
                  key={category.id}
                  className={`category-list-each ${
                    category.id === activeCategoryId || category.draggedOver ? 'active' : ''
                  }`}
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
                  onDragOver={allowDrop}
                  onDragEnter={() => {
                    _categoryDragEnter(category)
                  }}
                  onDragLeave={() => {
                    _categoryDragLeave(category)
                  }}
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
                        data-testID="category-edit"
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
                    data-testID="category-options"
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
                    <X size={12} aria-label="Remove category" />
                  </div>
                </div>
              )
            })}
          </div>
          {!addingTempCategory && (
            <button
              data-testid="category-button"
              className="category-button"
              onClick={newTempCategoryHandler}
              aria-label="Add category"
            >
              <Plus size={15} color={iconColor} />
              Add Category
            </button>
          )}
          {addingTempCategory && (
            <form className="category-form" onSubmit={onSubmitNewCategory}>
              <input
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
          )}
        </section>
      </aside>
      {lastSynced && (
        <section className="app-sidebar-synced">
          <div className="last-synced">
            <Check size={14} className="app-sidebar-icon" />{' '}
            {moment(lastSynced).format('h:mm A on M/D/Y')}
          </div>
        </section>
      )}
    </>
  )
}

export default AppSidebar
