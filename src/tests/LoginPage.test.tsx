import { useRouter } from 'next/navigation'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from './utils/test-utils'
import LoginPage from '../pages/login'

describe('Login page', () => {
  it('should redirect to home page after login', async () => {
    renderWithProviders(<LoginPage />)
    expect(await screen.findByText('Login Form')).toBeVisible()
    await userEvent.type(screen.getByTestId('email-input'), 'test@email.com')
    await userEvent.type(screen.getByTestId('password-input'), '123456')
    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    const router = useRouter()
    expect(router.push).toHaveBeenCalledWith('/')
  })
})
