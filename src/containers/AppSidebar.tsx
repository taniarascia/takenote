import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import kebabCase from 'lodash/kebabCase'
import uuid from 'uuid/v4'
import moment from 'moment'
import { Trash2, Book, Folder, X, Cloud, PlusCircle } from 'react-feather'
import { Folders } from 'constants/enums'
import { CategoryItem, NoteItem, ApplicationState } from 'types'
import {
  addNote,
  addCategory,
  deleteCategory,
  pruneCategoryFromNotes,
  swapCategory,
  swapFolder,
  swapNote,
  syncState,
} from 'actions'

const iconColor = 'rgba(255, 255, 255, 0.4)'

interface AppProps {
  addNote: (note: NoteItem) => void
  activeNote?: NoteItem
  addCategory: (category: CategoryItem) => void
  deleteCategory: (categoryId: string) => void
  pruneCategoryFromNotes: (categoryId: string) => void
  swapCategory: (categoryId: string) => void
  swapFolder: (folder: string) => void
  swapNote: (swapNote: string) => void
  notes: NoteItem[]
  categories: CategoryItem[]
  activeCategoryId: string
  activeFolder: string
  syncState: (notes: NoteItem[], categories: CategoryItem[]) => void
}

const AppSidebar: React.FC<AppProps> = ({
  addNote,
  activeNote,
  addCategory,
  deleteCategory,
  pruneCategoryFromNotes,
  swapCategory,
  swapFolder,
  swapNote,
  notes,
  categories,
  activeCategoryId,
  activeFolder,
  syncState,
}) => {
  const [addingTempCategory, setAddingTempCategory] = useState(false)
  const [tempCategory, setTempCategory] = useState('')

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  const newNoteHandler = () => {
    const note: NoteItem = {
      id: uuid(),
      text: '',
      created: moment().format(),
      lastUpdated: moment().format(),
      category: activeCategoryId ? activeCategoryId : undefined,
    }

    if ((activeNote && activeNote.text !== '') || !activeNote) {
      addNote(note)
      swapNote(note.id)
    }
  }

  const onSubmit = (
    event: React.FormEvent<HTMLFormElement> | React.FocusEvent<HTMLInputElement>
  ): void => {
    event.preventDefault()

    const category = { id: kebabCase(tempCategory), name: tempCategory }

    if (!categories.find(cat => cat.id === kebabCase(tempCategory))) {
      addCategory(category)

      setTempCategory('')
      setAddingTempCategory(false)
    }
  }

  const syncNotesHandler = () => {
    syncState(notes, categories)
  }

  return (
    <aside className="app-sidebar">
      <section id="app-sidebar-main">
        <div className="app-sidebar-link" onClick={newNoteHandler}>
          <PlusCircle size={15} style={{ marginRight: '.5rem' }} color={iconColor} />
          Add Note
        </div>
        <div
          className={activeFolder === Folders.ALL ? 'app-sidebar-link active' : 'app-sidebar-link'}
          onClick={() => {
            swapFolder(Folders.ALL)
          }}
        >
          <Book size={15} style={{ marginRight: '.5rem' }} color={iconColor} />
          Notes
        </div>
        <div
          className={
            activeFolder === Folders.TRASH ? 'app-sidebar-link active' : 'app-sidebar-link'
          }
          onClick={() => {
            swapFolder(Folders.TRASH)
          }}
        >
          <Trash2 size={15} style={{ marginRight: '.5rem' }} color={iconColor} />
          Trash
        </div>

        <div className="category-title vbetween">
          <h2>Categories</h2>
          <button className="add-button" onClick={newTempCategoryHandler}>
            <PlusCircle size={15} color={iconColor} />
          </button>
        </div>
        <div className="category-list">
          {categories.map(category => {
            return (
              <div
                key={category.id}
                className={
                  category.id === activeCategoryId ? 'category-each active' : 'category-each'
                }
                onClick={() => {
                  const notesForNewCategory = notes.filter(
                    note => !note.trash && note.category === category.id
                  )
                  const newNoteId = notesForNewCategory.length > 0 ? notesForNewCategory[0].id : ''
                  if (category.id !== activeCategoryId) {
                    swapCategory(category.id)
                    swapNote(newNoteId)
                  }
                }}
              >
                <div className="category-each-name">
                  <Folder size={15} style={{ marginRight: '.5rem' }} color={iconColor} />
                  {category.name}
                </div>
                <div
                  className="category-options"
                  onClick={() => {
                    const newNoteId = notes.length > 0 ? notes[0].id : ''
                    deleteCategory(category.id)
                    pruneCategoryFromNotes(category.id)
                    swapFolder(Folders.ALL)
                    swapNote(newNoteId)
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
      <section>
        <div className="app-sidebar-link" onClick={syncNotesHandler}>
          <Cloud size={15} style={{ marginRight: '.5rem' }} color={iconColor} /> Sync
        </div>
      </section>
    </aside>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  activeNote: state.noteState.notes.find(note => note.id === state.noteState.activeNoteId),
  activeFolder: state.noteState.activeFolder,
  activeCategoryId: state.noteState.activeCategoryId,
  categories: state.categoryState.categories,
  notes: state.noteState.notes,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addNote: (note: NoteItem) => dispatch(addNote(note)),
  swapNote: (noteId: string) => dispatch(swapNote(noteId)),
  swapCategory: (categoryId: string) => dispatch(swapCategory(categoryId)),
  swapFolder: (folder: string) => dispatch(swapFolder(folder)),
  addCategory: (category: CategoryItem) => dispatch(addCategory(category)),
  deleteCategory: (categoryId: string) => dispatch(deleteCategory(categoryId)),
  pruneCategoryFromNotes: (categoryId: string) => dispatch(pruneCategoryFromNotes(categoryId)),
  syncState: (notes: NoteItem[], categories: CategoryItem[]) =>
    dispatch(syncState(notes, categories)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar)
