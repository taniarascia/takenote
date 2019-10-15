import { Action } from 'constants/enums'
import { CategoryActionTypes, CategoryState } from 'types'

const initialState: CategoryState = {
  categories: [],
  error: '',
  loading: true,
}

const categoryReducer = (state = initialState, action: CategoryActionTypes): CategoryState => {
  switch (action.type) {
    case Action.LOAD_CATEGORIES:
      return initialState
    case Action.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      }
    case Action.LOAD_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case Action.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      }
    case Action.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id
            ? {
                id: category.id,
                name: action.payload.name,
              }
            : category
        ),
      }
    case Action.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
      }
    default:
      return state
  }
}

export default categoryReducer
