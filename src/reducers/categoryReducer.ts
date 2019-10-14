import { Actions } from 'constants/enums'
import { CategoryActionTypes, CategoryState } from 'types'

const initialState: CategoryState = {
  categories: [],
  error: '',
  loading: true,
}

const categoryReducer = (state = initialState, action: CategoryActionTypes): CategoryState => {
  switch (action.type) {
    case Actions.LOAD_CATEGORIES:
      return initialState
    case Actions.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
      }
    case Actions.LOAD_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case Actions.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      }
    case Actions.UPDATE_CATEGORY:
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
    case Actions.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
      }
    default:
      return state
  }
}

export default categoryReducer
