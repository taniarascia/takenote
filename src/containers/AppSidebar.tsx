import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { CategoryItem, NoteItem, ApplicationState } from 'types'
import { addCategory, swapCategory, swapNote } from 'actions'
import kebabCase from 'lodash/kebabCase'

interface AppProps {
  addCategory: (category: CategoryItem) => void
  swapCategory: (categoryId: string) => void
  swapNote: (swapNote: string) => void
  notes: NoteItem[]
  categories: CategoryItem[]
  activeCategoryId: string
}

const AppSidebar: React.FC<AppProps> = ({
  addCategory,
  swapCategory,
  swapNote,
  notes,
  categories,
  activeCategoryId,
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

    addCategory(category)

    setTempCategory('')
    setAddingTempCategory(false)
  }

  return (
    <aside className="app-sidebar">
      <section id="app-sidebar-main">
        <div
          className="app-sidebar-link"
          onClick={() => {
            const newNoteId = notes.length > 0 ? notes[0].id : ''
            swapCategory('')
            swapNote(newNoteId)
          }}
        >
          Notes
        </div>

        <h2>Categories</h2>
        <div className="category-list">
          {categories.map(category => {
            return (
              <div
                className={
                  category.id === activeCategoryId ? 'category-each active' : 'category-each'
                }
                key={category.id}
                onClick={() => {
                  const notesForNewCategory = notes.filter(note => note.category === category.id)
                  const newNoteId = notesForNewCategory.length > 0 ? notesForNewCategory[0].id : ''
                  if (category.id !== activeCategoryId) {
                    swapCategory(category.id)
                    swapNote(newNoteId)
                  }
                }}
              >
                {category.name}
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
      <section id="app-sidebar-button">
        <button onClick={newTempCategoryHandler}>Add Category</button>
      </section>
    </aside>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  activeCategoryId: state.categoryState.activeCategoryId,
  categories: state.categoryState.categories,
  notes: state.noteState.notes,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  swapNote: (noteId: string) => dispatch(swapNote(noteId)),
  swapCategory: (categoryId: string) => dispatch(swapCategory(categoryId)),
  addCategory: (category: CategoryItem) => dispatch(addCategory(category)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar)
