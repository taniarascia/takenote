import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import 'jest-extended'

import { TestID } from '@resources/TestID'
import { FolderOption, FolderOptionProps } from '@/components/AppSidebar/FolderOption'
import { Folder } from '@/utils/enums'

describe('<FolderOption />', () => {
  it('renders the FolderOption component', () => {
    const enabledProps: FolderOptionProps = {
      swapFolder: jest.fn,
      addNoteType: jest.fn,
      text: 'Test',
      dataTestID: TestID.FOLDER_NOTES,
      active: true,
      folder: Folder.CATEGORY,
    }

    const component = render(<FolderOption {...enabledProps} />)

    expect(component).toBeTruthy()
  })
})
