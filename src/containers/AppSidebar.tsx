import kebabCase from 'lodash/kebabCase'
import React, { useState } from 'react'
import {
  Book,
  Bookmark,
  Folder as FolderIcon,
  Plus,
  Settings,
  Trash2,
  UploadCloud,
  X,
  Loader,
} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { Folder } from 'constants/enums'
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
import { RootState, CategoryItem, NoteItem } from 'types'

const iconColor = 'rgba(255, 255, 255, 0.25)'

const AppSidebar: React.FC = () => {
  const { categories } = useSelector((state: RootState) => state.categoryState)
  const { activeCategoryId, activeFolder, activeNoteId, notes } = useSelector(
    (state: RootState) => state.noteState
  )
  const [editingCategoryId, setEditingCategoryId] = useState('')

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

  const {
    errorCategoryMessage,
    setErrorCategoryMessage,
    addingTempCategory,
    setAddingTempCategory,
  } = useTempState()
  const [tempCategory, setTempCategory] = useState('')
  const { syncing } = useSelector((state: RootState) => state.syncState)

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  const newNoteHandler = () => {
    if ((activeNote && activeNote.text !== '') || !activeNote) {
      const note = newNote(activeCategoryId, activeFolder)

      _addNote(note)
      _swapNote(note.id)
    }
  }

  const resetTempCategory = () => {
    setTempCategory('')
    setAddingTempCategory(false)
    setErrorCategoryMessage('')
  }

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ): void => {
    event.preventDefault()

    const category = { id: kebabCase(tempCategory), name: tempCategory }

    if (category.name.length > 20) {
      setErrorCategoryMessage('Category name must not exceed 20 characters')
    } else if (categories.find(cat => cat.id === kebabCase(tempCategory))) {
      setErrorCategoryMessage('Category name has already been added')
    } else {
      _addCategory(category)

      resetTempCategory()
    }
  }

  const syncNotesHandler = () => {
    _syncState(notes, categories)
  }

  const settingsHandler = () => {
    _toggleSettingsModal()
  }

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const trashNoteHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    _toggleTrashedNote(event.dataTransfer.getData('text'))
  }

  const favoriteNoteHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    _toggleFavoriteNote(event.dataTransfer.getData('text'))
  }

  return (
    <aside className="app-sidebar">
      <section className="app-sidebar-actions">
        <>
          {activeFolder !== Folder.TRASH && (
            <button
              className="action-button"
              aria-label="Create new note"
              onClick={newNoteHandler}
              title="Create note"
            >
              <span>
                <Plus
                  className="action-button-icon"
                  size={18}
                  color={iconColor}
                  aria-hidden="true"
                  focusable="false"
                />
              </span>
            </button>
          )}
          <button
            className="action-button"
            aria-label="Sync notes"
            onClick={syncNotesHandler}
            disabled={syncing}
            title="Sync notes"
          >
            <span>
              {syncing ? (
                <Loader
                  size={18}
                  className="action-button-icon"
                  color={iconColor}
                  aria-hidden="true"
                  focusable="false"
                />
              ) : (
                <UploadCloud
                  size={18}
                  className="action-button-icon"
                  color={iconColor}
                  aria-hidden="true"
                  focusable="false"
                />
              )}
            </span>
          </button>
          <button
            className="action-button"
            aria-label="Settings"
            onClick={settingsHandler}
            title="Settings"
          >
            <span>
              <Settings
                size={18}
                className="action-button-icon"
                color={iconColor}
                aria-hidden="true"
                focusable="false"
              />
            </span>
          </button>
        </>
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
        >
          <Bookmark size={15} className="app-sidebar-icon" color={iconColor} />
          Favorites
        </div>
        <div
          className={`app-sidebar-link ${activeFolder === Folder.TRASH ? 'active' : ''}`}
          onClick={() => {
            _swapFolder(Folder.TRASH)
          }}
          onDrop={trashNoteHandler}
          onDragOver={allowDrop}
        >
          <Trash2 size={15} className="app-sidebar-icon" color={iconColor} />
          Trash
        </div>

        <div className="category-title v-between">
          <h2>Categories</h2>
          <button className="category-button" onClick={newTempCategoryHandler}>
            <Plus size={15} color={iconColor} />
          </button>
        </div>
        <div className="category-list">
          {errorCategoryMessage && (
            <div className="category-error-message">{errorCategoryMessage}</div>
          )}
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
                  onSubmit={e => {
                    setEditingCategoryId('')
                    e.preventDefault()
                  }}
                >
                  <FolderIcon size={15} className="app-sidebar-icon" color={iconColor} />
                  {editingCategoryId === category.id ? (
                    <input
                      value={category.name}
                      onChange={event => {
                        _updateCategory({ ...category, name: event.target.value })
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
                  <X size={12} />
                </div>
              </div>
            )
          })}
        </div>
        {addingTempCategory && (
          <form className="category-form" onSubmit={onSubmit}>
            <input
              autoFocus
              placeholder="New category..."
              onChange={event => {
                setTempCategory(event.target.value)
              }}
              onBlur={event => {
                if (!tempCategory || errorCategoryMessage) {
                  resetTempCategory()
                } else {
                  onSubmit(event)
                }
              }}
            />
          </form>
        )}
      </section>
    </aside>
  )
}

export default AppSidebar
