import { screen } from '@testing-library/react'
import { renderWithProviders } from './utils/test-utils'
import HomePage from '../pages/index'

const a = 3

vi.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'mocked-font-class',
  }),
}))

describe('Home page', () => {
  it('should correctly render Home Page', async () => {
    renderWithProviders(<HomePage />)
    expect(await screen.findByText('Welcome to My Space!')).toBeVisible()
  })
})
