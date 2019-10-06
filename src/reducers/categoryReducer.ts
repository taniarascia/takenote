import { ActionType } from 'constants/enums'
import { CategoryState } from 'types'

const initialState: CategoryState = {
  categories: [],
  active: '',
  error: '',
  loading: true,
}

const categoryReducer = (state = initialState, action): CategoryState => {
  switch (action.type) {
    case ActionType.LOAD_CATEGORIES:
      return initialState
    case ActionType.LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        active: '',
        loading: false,
      }
    case ActionType.LOAD_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    case ActionType.SWAP_CATEGORY:
      return {
        ...state,
        active: action.payload,
      }
    case ActionType.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      }
    case ActionType.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id
            ? {
                id: category.id,
                name: action.payload.title,
              }
            : category
        ),
      }
    case ActionType.DELETE_CATEGORY:
      const deletedCategoryIndex = state.categories.findIndex(
        category => category.id === action.payload
      )
      let newActiveCategoryId = ''

      if (deletedCategoryIndex === 0 && state.categories[1]) {
        newActiveCategoryId = state.categories[deletedCategoryIndex + 1].id
      } else if (state.categories[deletedCategoryIndex - 1]) {
        newActiveCategoryId = state.categories[deletedCategoryIndex - 1].id
      }

      return {
        ...state,
        categories: state.categories.filter(category => category.id !== action.payload),
        active: newActiveCategoryId,
      }
    default:
      return state
  }
}

export default categoryReducer
