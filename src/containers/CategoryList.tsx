import React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

const CategoryList: React.FC = () => (
  <aside className="category-sidebar">
    <div className="category-list">
      {[1, 2, 3].map(category => {
        return (
          <div className={!category ? 'category-each active' : 'category-each'} key={category}>
            Category
          </div>
        )
      })}
    </div>
  </aside>
)

const mapStateToProps = state => ({})

const mapDispatchToProps = (dispatch: Dispatch) => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryList)
