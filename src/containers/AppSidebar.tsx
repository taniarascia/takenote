import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { CategoryItem, ApplicationState } from 'types'
import { addCategory, swapCategory } from 'actions'
import kebabCase from 'lodash/kebabCase'

interface AppProps {
  addCategory: (category: CategoryItem) => void
  swapCategory: (categoryId: string) => void
  categories: CategoryItem[]
  activeCategoryId: string
}

const AppSidebar: React.FC<AppProps> = ({
  addCategory,
  swapCategory,
  categories,
  activeCategoryId,
}) => {
  const [addingTempCategory, setAddingTempCategory] = useState(false)
  const [tempCategory, setTempCategory] = useState('')

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  const onSubmit = event => {
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
            swapCategory('')
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
                  if (category.id !== activeCategoryId) {
                    swapCategory(category.id)
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
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  swapCategory: (categoryId: string) => dispatch(swapCategory(categoryId)),
  addCategory: (category: CategoryItem) => dispatch(addCategory(category)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar)
