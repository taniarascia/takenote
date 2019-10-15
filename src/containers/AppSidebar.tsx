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
} from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'

import { Folder } from 'constants/enums'
import { useKeyboard } from 'contexts/KeyboardContext'
import { newNote } from 'helpers'
import { addCategory, deleteCategory } from 'slices/category'
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

  const activeNote = notes.find(note => note.id === activeNoteId)

  const dispatch = useDispatch()

  const _addNote = (note: NoteItem) => dispatch(addNote(note))
  const _swapNote = (noteId: string) => dispatch(swapNote(noteId))
  const _swapCategory = (categoryId: string) => dispatch(swapCategory(categoryId))
  const _swapFolder = (folder: string) => dispatch(swapFolder(folder))
  const _addCategory = (category: CategoryItem) => dispatch(addCategory(category))
  const _deleteCategory = (categoryId: string) => dispatch(deleteCategory(categoryId))
  const _pruneCategoryFromNotes = (categoryId: string) =>
    dispatch(pruneCategoryFromNotes(categoryId))
  const _syncState = (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState({ notes, categories }))
  const _toggleSettingsModal = () => dispatch(toggleSettingsModal())
  const _toggleTrashedNote = (noteId: string) => dispatch(toggleTrashedNote(noteId))
  const _toggleFavoriteNote = (noteId: string) => dispatch(toggleFavoriteNote(noteId))
  const _addCategoryToNote = (categoryId: string, noteId: string) =>
    dispatch(addCategoryToNote(categoryId, noteId))

  const { addingTempCategory, setAddingTempCategory } = useKeyboard()
  const [tempCategory, setTempCategory] = useState('')

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

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ): void => {
    event.preventDefault()

    const category = { id: kebabCase(tempCategory), name: tempCategory }

    if (!categories.find(cat => cat.id === kebabCase(tempCategory))) {
      _addCategory(category)

      setTempCategory('')
      setAddingTempCategory(false)
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
    _toggleTrashedNote(event.dataTransfer.getData('text'))
  }

  const favoriteNoteHandler = (event: React.DragEvent<HTMLDivElement>) => {
    _toggleFavoriteNote(event.dataTransfer.getData('text'))
  }

  return (
    <aside className="app-sidebar">
      <section className="app-sidebar-main">
        <div
          className={`app-sidebar-link ${activeFolder === Folder.ALL ? 'active' : ''}`}
          onClick={() => {
            _swapFolder(Folder.ALL)
          }}
        >
          <Book size={15} style={{ marginRight: '.75rem' }} color={iconColor} />
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
          <Bookmark size={15} style={{ marginRight: '.75rem' }} color={iconColor} />
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
          <Trash2 size={15} style={{ marginRight: '.75rem' }} color={iconColor} />
          Trash
        </div>

        <div className="category-title vbetween">
          <h2>Categories</h2>
          <button className="add-category-button" onClick={newTempCategoryHandler}>
            <Plus size={15} color={iconColor} />
          </button>
        </div>
        <div className="category-list">
          {categories.map(category => {
            return (
              <div
                key={category.id}
                className={`category-each ${category.id === activeCategoryId ? 'active' : ''}`}
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
                onDrop={event => {
                  _addCategoryToNote(category.id, event.dataTransfer.getData('noteId'))
                }}
                onDragOver={allowDrop}
              >
                <div className="category-each-name">
                  <FolderIcon size={15} style={{ marginRight: '.75rem' }} color={iconColor} />
                  {category.name}
                </div>
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
          <form className="add-category-form" onSubmit={onSubmit}>
            <input
              autoFocus
              placeholder="New category..."
              onChange={event => {
                setTempCategory(event.target.value)
              }}
              onBlur={event => {
                if (!tempCategory) {
                  setAddingTempCategory(false)
                } else {
                  onSubmit(event)
                }
              }}
            />
          </form>
        )}
      </section>
      <section className="app-sidebar-actions">
        <div>
          {activeFolder !== Folder.TRASH && (
            <Plus className="action-button" size={18} color={iconColor} onClick={newNoteHandler} />
          )}
          <UploadCloud
            size={18}
            className="action-button"
            color={iconColor}
            onClick={syncNotesHandler}
          />
          <Settings
            size={18}
            className="action-button"
            color={iconColor}
            onClick={settingsHandler}
          />
        </div>
      </section>
    </aside>
  )
}

export default AppSidebar
