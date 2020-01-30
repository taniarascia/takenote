// category.spec.ts
// Tests for manipulating note categories

import {
  addCategory,
  assertCategoryDoesNotExist,
  removeCategory,
} from './utils/testCategoryHelperUtils'
import { dynamicTimeCategoryName } from './utils/testHelperEnums'
import { defaultInit } from './utils/testHelperUtils'

describe('Category tests', () => {
  defaultInit()

  it('creates a new category with the current time', () => {
    addCategory(dynamicTimeCategoryName)
  })

  it('should delete a category just created with the current time', () => {
    addCategory(dynamicTimeCategoryName)

    removeCategory(dynamicTimeCategoryName)

    assertCategoryDoesNotExist(dynamicTimeCategoryName)
  })
})
