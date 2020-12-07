import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import { AddCategoryForm, AddCategoryFormProps } from '@/components/AppSidebar/AddCategoryForm'

describe('<AddCategoryForm />', () => {
  it('renders the AddCategoryForm component', () => {
    const enabledProps: AddCategoryFormProps = {
      submitHandler: jest.fn,
      changeHandler: jest.fn,
      resetHandler: jest.fn,
      editingCategoryId: 'Category-id',
      tempCategoryName: 'Category-id',
      dataTestID: TestID.NEW_CATEGORY_INPUT,
    }

    const component = render(<AddCategoryForm {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
