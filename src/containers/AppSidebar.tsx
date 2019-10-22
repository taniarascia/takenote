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

import AppSidebarAction from 'components/AppSidebarAction'
import { Folder } from 'constants/enums'
import { iconColor } from 'constants/index'
import { useTempState } from 'contexts/TempStateContext'
import { newNote } from 'helpers'
import { addCategory, updateCategory, deleteCategory } from 'slices/category'
import {
  addCategoryToNote,
  addNote,
  pruneCategoryFromNotes,
  swapCategory,
  swapFolder,
  swapNote,
  toggleFavoriteNote,
  toggleTrashedNote,
} from 'slices/note'
import { toggleSettingsModal } from 'slices/settings'
import { syncState } from 'slices/sync'
import { CategoryItem, NoteItem, ReactDragEvent, ReactSubmitEvent, RootState } from 'types'

const AppSidebar: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categoryState)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(
    (state: RootState) => state.noteState
  )
  const activeNote = notes.find(note => note.id === activeNoteId)

  const dispatch = useDispatch()

  const _addNote = (note: NoteItem) => dispatch(addNote(note))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))
  const _swapFolder = (folder: Folder) => dispatch(swapFolder(folder))
  const _addCategory = (category: CategoryItem) => dispatch(addCategory(category))
  const _updateCategory = (category: CategoryItem) => dispatch(updateCategory(category))
  const _deleteCategory = (categoryId: string) => dispatch(deleteCategory(categoryId))
  const _pruneCategoryFromNotes = (categoryId: string) =>
    dispatch(pruneCategoryFromNotes(categoryId))
  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }))
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _toggleFavoriteNote = (noteId: string) => dispatch(toggleFavoriteNote(noteId))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote({ categoryId, noteId }))

  const { setErrorCategoryMessage, addingTempCategory, setAddingTempCategory } = useTempState()

  const [editingCategoryId, setEditingCategoryId] = useState('')
  const [tempCategoryName, setTempCategoryName] = useState('')
  const { syncing, lastSynced } = useSelector((state: RootState) => state.syncState)

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  const newNoteHandler = () => {
    if (activeFolder === Folder.TRASH) {
      _swapFolder(Folder.ALL)
    }

    if ((activeNote && activeNote.text !== '') || !activeNote) {
      const note = newNote(
        activeCategoryId,
        activeFolder === Folder.TRASH ? Folder.ALL : activeFolder
      )
      _addNote(note)
      _swapNote(note.id)
    }
  }

  const resetTempCategory = () => {
    setTempCategoryName('')
    setAddingTempCategory(false)
    setErrorCategoryMessage('')
    setEditingCategoryId('')
  }

  const onSubmitNewCategory = (event: ReactSubmitEvent): void => {
    event.preventDefault()

    const category = { id: uuid(), name: tempCategoryName.trim() }

    if (categories.find(cat => cat.name === category.name) || category.name === '') {
      resetTempCategory()
    } else {
      _addCategory(category)
      resetTempCategory()
    }
  }

  const onSubmitUpdateCategory = (event: ReactSubmitEvent): void => {
    event.preventDefault()

    const category = { id: editingCategoryId, name: tempCategoryName.trim() }

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
  }

  const favoriteNoteHandler = (event: ReactDragEvent) => {
    event.preventDefault()

    _toggleFavoriteNote(event.dataTransfer.getData('text'))
  }

  return (
    <aside className="app-sidebar">
      <section className="app-sidebar-actions">
        <AppSidebarAction handler={newNoteHandler} icon={Plus} label="Create new note" />
        <AppSidebarAction
          handler={syncNotesHandler}
          icon={syncing ? Loader : UploadCloud}
          label="Sync notes"
        />
        <AppSidebarAction handler={settingsHandler} icon={Settings} label="Settings" />
      </section>
      <section className="app-sidebar-main">
        <div
          className={`app-sidebar-link ${activeFolder === Folder.ALL ? 'active' : ''}`}
          onClick={() => {
            _swapFolder(Folder.ALL)
          }}
        >
          <Book size={15} className="app-sidebar-icon" color={iconColor} />
          All Notes
        </div>
        <div
          className={`app-sidebar-link ${activeFolder === Folder.FAVORITES ? 'active' : ''}`}
          onClick={() => {
            _swapFolder(Folder.FAVORITES)
          }}
          onDrop={favoriteNoteHandler}
          onDragOver={allowDrop}
          data-testid="favorites"
        >
          <Star size={15} className="app-sidebar-icon" color={iconColor} />
          Favorites
        </div>
        <div
          className={`app-sidebar-link ${activeFolder === Folder.TRASH ? 'active' : ''}`}
          onClick={() => {
            _swapFolder(Folder.TRASH)
          }}
          onDrop={trashNoteHandler}
          onDragOver={allowDrop}
          data-testid="trash"
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
                key={category.id}
                className={`category-list-each ${category.id === activeCategoryId ? 'active' : ''}`}
                onClick={() => {
                  const notesForNewCategory = notes.filter(
                    note => !note.trash && note.category === category.id
                  )
                  const newNoteId = notesForNewCategory.length > 0 ? notesForNewCategory[0].id : ''
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
                }}
                onDragOver={allowDrop}
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
                      type="text"
                      autoFocus
                      maxLength={20}
                      className="category-edit"
                      value={tempCategoryName}
                      onChange={event => {
                        setTempCategoryName(event.target.value)
                      }}
                      onBlur={event => {
                        resetTempCategory()
                      }}
                    />
                  ) : (
                    category.name
                  )}
                </form>
                <div
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
      {lastSynced && (
        <section className="app-sidebar-synced">
          <div className="last-synced">
            <Check size={14} className="app-sidebar-icon" />{' '}
            {moment(lastSynced).format('h:mm A on M/D/Y')}
          </div>
        </section>
      )}
    </aside>
  )
}

export default AppSidebar
