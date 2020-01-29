import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CategoryItem, CategoryState } from 'types'

const initialState: CategoryState = {
  categories: [],
  error: '',
  loading: true,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<CategoryItem>) => ({
      ...state,
      categories: [...state.categories, payload],
    }),
    categoryDragEnter: (state, { payload }: PayloadAction<CategoryItem>) => ({
      ...state,
      categories: state.categories.map(category =>
        category.id === payload.id ? { ...category, draggedOver: true } : category
      ),
    }),
    categoryDragLeave: (state, { payload }: PayloadAction<CategoryItem>) => ({
      ...state,
      categories: state.categories.map(category =>
        category.id === payload.id ? { ...category, draggedOver: false } : category
      ),
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
        category.id === payload.id ? { ...category, name: payload.name } : category
      ),
    }),
  },
})

export const {
  addCategory,
  categoryDragEnter,
  categoryDragLeave,
  deleteCategory,
  loadCategories,
  loadCategoriesError,
  loadCategoriesSuccess,
  updateCategory,
} = categorySlice.actions

export default categorySlice.reducer
