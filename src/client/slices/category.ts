import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CategoryItem, CategoryState } from '@/types'

const _swapCategories = (categories: CategoryItem[], categoryId: number, destinationId: number) => {
  const newCategories = [...categories]
  newCategories.splice(categoryId, 1)
  newCategories.splice(destinationId, 0, categories[categoryId])

  return newCategories
}

const initialState: CategoryState = {
  categories: [],
  editingCategory: {
    id: '',
    tempName: '',
  },
  error: '',
  loading: true,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    addCategory: (state, { payload }: PayloadAction<CategoryItem>) => {
      state.categories.push(payload)
    },

    updateCategory: (state, { payload }: PayloadAction<CategoryItem>) => ({
      ...state,
      categories: state.categories.map((category) =>
        category.id === payload.id ? { ...category, name: payload.name } : category
      ),
    }),

    deleteCategory: (state, { payload }: PayloadAction<string>) => {
      state.categories = state.categories.filter((category) => category.id !== payload)
    },

    categoryDragEnter: (state, { payload }: PayloadAction<CategoryItem>) => {
      state.categories = state.categories.map((category) =>
        category.id === payload.id ? { ...category, draggedOver: true } : category
      )
    },

    categoryDragLeave: (state, { payload }: PayloadAction<CategoryItem>) => {
      state.categories = state.categories.map((category) =>
        category.id === payload.id ? { ...category, draggedOver: false } : category
      )
    },

    swapCategories: (
      state,
      { payload }: PayloadAction<{ categoryId: number; destinationId: number }>
    ) => {
      state.categories = _swapCategories(
        state.categories,
        payload.categoryId,
        payload.destinationId
      )
    },

    setCategoryEdit: (state, { payload }: PayloadAction<{ id: string; tempName: string }>) => {
      state.editingCategory = payload
    },

    loadCategories: (state) => {
      state.loading = true
    },

    loadCategoriesError: (state, { payload }: PayloadAction<string>) => {
      state.loading = false
      state.error = payload
    },

    loadCategoriesSuccess: (state, { payload }: PayloadAction<CategoryItem[]>) => {
      state.categories = payload
      state.loading = false
    },
  },
})

export const {
  addCategory,
  categoryDragEnter,
  categoryDragLeave,
  swapCategories,
  deleteCategory,
  loadCategories,
  loadCategoriesError,
  loadCategoriesSuccess,
  updateCategory,
  setCategoryEdit,
} = categorySlice.actions

export default categorySlice.reducer
