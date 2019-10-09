import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import kebabCase from 'lodash/kebabCase'
import { Folders } from 'constants/enums'
import { CategoryItem, NoteItem, ApplicationState } from 'types'
import {
  addCategory,
  deleteCategory,
  pruneCategoryFromNotes,
  swapCategory,
  swapFolder,
  swapNote,
} from 'actions'

interface AppProps {
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
}

const AppSidebar: React.FC<AppProps> = ({
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
}) => {
  const [addingTempCategory, setAddingTempCategory] = useState(false)
  const [tempCategory, setTempCategory] = useState('')

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
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

  return (
    <aside className="app-sidebar">
      <section id="app-sidebar-main">
        <div
          className={activeFolder === Folders.ALL ? 'app-sidebar-link active' : 'app-sidebar-link'}
          onClick={() => {
            swapFolder(Folders.ALL)
          }}
        >
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
          Trash
        </div>

        <div className="category-title vbetween">
          <h2>Categories</h2>
          <button className="add-button" onClick={newTempCategoryHandler}>
            +
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
                <div>{category.name}</div>
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
                  X
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
    </aside>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  activeFolder: state.noteState.activeFolder,
  activeCategoryId: state.noteState.activeCategoryId,
  categories: state.categoryState.categories,
  notes: state.noteState.notes,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  swapNote: (noteId: string) => dispatch(swapNote(noteId)),
  swapCategory: (categoryId: string) => dispatch(swapCategory(categoryId)),
  swapFolder: (folder: string) => dispatch(swapFolder(folder)),
  addCategory: (category: CategoryItem) => dispatch(addCategory(category)),
  deleteCategory: (categoryId: string) => dispatch(deleteCategory(categoryId)),
  pruneCategoryFromNotes: (categoryId: string) => dispatch(pruneCategoryFromNotes(categoryId)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar)
