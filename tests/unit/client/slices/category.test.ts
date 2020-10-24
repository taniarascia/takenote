import { PayloadAction } from '@reduxjs/toolkit'

import reducer, {
  initialState,
  addCategory,
  updateCategory,
  deleteCategory,
  categoryDragEnter,
  categoryDragLeave,
  setCategoryEdit,
  loadCategories,
  loadCategoriesError,
  loadCategoriesSuccess,
  swapCategories,
} from '@/slices/category'

describe('categorySlice', () => {
  test('should return initial state on first run', () => {
    const nextState = initialState
    const action = {} as PayloadAction
    const result = reducer(undefined, action)

    expect(result).toEqual(nextState)
  })

  test('should add passed payload in the existing category list on addCategory', () => {
    const payload = { id: '123', name: 'note 0', draggedOver: false }
    const nextState = { ...initialState, categories: [payload] }

    const result = reducer(initialState, addCategory(payload))

    expect(result).toEqual(nextState)
  })

  test('should update the category name on updateCategory', () => {
    const payload = { id: '123', name: 'note 0 renamed', draggedOver: false }
    const nextState = { ...initialState, categories: [payload] }
    const initialStateBeforeUpdateCategory = {
      ...initialState,
      categories: [
        {
          id: '123',
          name: 'note 0',
          draggedOver: false,
        },
      ],
    }
    const result = reducer(initialStateBeforeUpdateCategory, updateCategory(payload))

    expect(result).toEqual(nextState)
  })

  test('should delete the category name on deleteCategory', () => {
    const initialStateBeforeDeleteCategory = {
      ...initialState,
      categories: [
        {
          id: '123',
          name: 'note 0',
          draggedOver: false,
        },
        {
          id: '456',
          name: 'note 1',
          draggedOver: false,
        },
      ],
    }

    const nextState = {
      ...initialState,
      categories: [
        {
          id: '123',
          name: 'note 0',
          draggedOver: false,
        },
      ],
    }
    const result = reducer(initialStateBeforeDeleteCategory, deleteCategory('456'))

    expect(result).toEqual(nextState)
  })

  test('should set draggedOver to true on categoryDragEnter', () => {
    const payload = { id: '123', name: 'note 0 renamed', draggedOver: false }
    const initialStateBeforeCategoryDragEnter = {
      ...initialState,
      categories: [
        {
          id: '123',
          name: 'note 0',
          draggedOver: false,
        },
      ],
    }
    const nextState = {
      ...initialState,
      categories: [
        {
          id: '123',
          name: 'note 0',
          draggedOver: true,
        },
      ],
    }

    const result = reducer(initialStateBeforeCategoryDragEnter, categoryDragEnter(payload))
    expect(result).toEqual(nextState)
  })

  test('should set draggedOver to false on categoryDragLeave', () => {
    const payload = { id: '123', name: 'note 0 renamed', draggedOver: false }
    const initialStateBeforeCategoryDragLeave = {
      ...initialState,
      categories: [
        {
          id: '123',
          name: 'note 0',
          draggedOver: true,
        },
      ],
    }
    const nextState = {
      ...initialState,
      categories: [
        {
          id: '123',
          name: 'note 0',
          draggedOver: false,
        },
      ],
    }

    const result = reducer(initialStateBeforeCategoryDragLeave, categoryDragLeave(payload))
    expect(result).toEqual(nextState)
  })

  test('should swap categories', () => {
    const payload = {
      categoryId: 0,
      destinationId: 2,
    }
    const initialStateBeforeSwapCategories = {
      ...initialState,
      categories: [
        {
          id: '1',
          name: 'note 0',
          draggedOver: false,
        },
        {
          id: '2',
          name: 'note 1',
          draggedOver: false,
        },
        {
          id: '3',
          name: 'note 2',
          draggedOver: false,
        },
      ],
    }

    const nextState = {
      ...initialState,
      categories: [
        {
          id: '2',
          name: 'note 1',
          draggedOver: false,
        },
        {
          id: '3',
          name: 'note 2',
          draggedOver: false,
        },
        {
          id: '1',
          name: 'note 0',
          draggedOver: false,
        },
      ],
    }
    const result = reducer(initialStateBeforeSwapCategories, swapCategories(payload))

    expect(result).toEqual(nextState)
  })

  test('should set editing category to payload on setCategoryEdit', () => {
    const payload = {
      id: '123',
      tempName: 'tempName',
    }
    const nextState = {
      ...initialState,
      editingCategory: payload,
    }
    const result = reducer(initialState, setCategoryEdit(payload))
    expect(result).toEqual(nextState)
  })

  test('should set loading true on loadCategories', () => {
    const nextState = {
      ...initialState,
      loading: true,
    }
    const result = reducer(initialState, loadCategories())
    expect(result).toEqual(nextState)
  })

  test('should set loading false and error to payload on loadCategoriesError', () => {
    const payload = 'test error'
    const nextState = {
      ...initialState,
      loading: false,
      error: payload,
    }
    const result = reducer(initialState, loadCategoriesError(payload))
    expect(result).toEqual(nextState)
  })

  test('should set loading false and categories to payload on loadCategoriesSuccess', () => {
    const payload = [{ id: '123', name: 'note 0', draggedOver: false }]
    const nextState = {
      ...initialState,
      loading: false,
      categories: payload,
    }
    const result = reducer(initialState, loadCategoriesSuccess(payload))
    expect(result).toEqual(nextState)
  })
})
