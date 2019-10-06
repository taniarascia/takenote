import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

const AppSidebar: React.FC = () => (
  <aside className="app-sidebar">
    <div>All notes</div>
    <div className="category-list">
      {[1, 2, 3].map(category => {
        return (
          <div className={!category ? 'category-each active' : 'category-each'} key={category}>
            Category
          </div>
        )
      })}
    </div>
    <div>Add Category</div>
  </aside>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSidebar)
