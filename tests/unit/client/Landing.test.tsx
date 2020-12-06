import React from 'react'
import { render } from '@testing-library/react'
import * as rdd from 'react-device-detect'

import { LandingPage } from '@/components/LandingPage'

describe('<LandingPage />', () => {
  it('renders the LandingPage component', () => {
    render(<LandingPage />)
  })
  it('<LandingPage />in mobile view', () => {
    Object.assign(rdd, { isMobile: true })
    render(<LandingPage />)
  })
})
