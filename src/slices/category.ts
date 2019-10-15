import { createSlice, PayloadAction, Slice } from 'redux-starter-kit'

import { CategoryItem, CategoryState } from 'types'

const initialState: CategoryState = {
  categories: [],
  error: '',
  loading: true,
}

const categorySlice: Slice<CategoryState> = createSlice({
  slice: 'category',
  initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<CategoryItem>) => ({
      ...state,
      categories: [...state.categories, payload],
    }),
    deleteCategory: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      categories: state.categories.filter(category => category.id !== payload),
    }),
    loadCategories: () => initialState,
    loadCategoriesError: (state, { payload }: PayloadAction<string>) => ({
      ...state,
      loading: false,
      error: payload,
    }),
    loadCategoriesSuccess: (state, { payload }: PayloadAction<CategoryItem[]>) => ({
      ...state,
      categories: payload,
      loading: false,
    }),
    updateCategory: (state, { payload }: PayloadAction<CategoryItem>) => ({
      ...state,
      categories: state.categories.map(category =>
        category.id === payload.id ? { id: category.id, name: payload.name } : category
      ),
    }),
  },
})

export const {
  addCategory,
  deleteCategory,
  loadCategories,
  loadCategoriesError,
  loadCategoriesSuccess,
  updateCategory,
} = categorySlice.actions

export default categorySlice.reducer
