import React, { useState } from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { CategoryItem } from 'types'
import { addCategory } from 'actions'
import kebabCase from 'lodash/kebabCase'

interface AppProps {
  addCategory: Function
  categories: CategoryItem[]
}

const AppSidebar: React.FC<AppProps> = ({ addCategory, categories }) => {
  const [addingTempCategory, setAddingTempCategory] = useState(false)
  const [tempCategory, setTempCategory] = useState('')

  const newTempCategoryHandler = () => {
    !addingTempCategory && setAddingTempCategory(true)
  }

  return (
    <aside className="app-sidebar">
      <section id="app-sidebar-main">
        <h1>vNote</h1>
        <p>All Notes</p>
        <h2>Categories</h2>

        <div className="category-list">
          {categories.map(category => {
            return (
              <div
                className={!category ? 'category-each active' : 'category-each'}
                key={category.id}
              >
                {category.name}
              </div>
            )
          })}
        </div>
        {addingTempCategory && (
          <form
            className="add-category-form"
            onSubmit={event => {
              event.preventDefault()

              const category = { id: kebabCase(tempCategory), name: tempCategory }

              addCategory(category)

              setTempCategory('')
              setAddingTempCategory(false)
            }}
          >
            <input
              autoFocus
              placeholder="New category name..."
              onChange={event => {
                setTempCategory(event.target.value)
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

const mapStateToProps = state => ({
  categories: state.categoryState.categories,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addCategory: category => dispatch(addCategory(category)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar)
