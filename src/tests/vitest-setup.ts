import '@testing-library/jest-dom/vitest'

import { configure } from '@testing-library/react'

import { server } from './msw/server'

vi.stubEnv('NEXT_PUBLIC_API_ROOT', 'https://localhost.test')

vi.mock('next/navigation', async (importOriginal) => {
  const mockRedirect = vi.fn()
  const mockPush = vi.fn()
  const mockReplace = vi.fn()

  return {
    ...(await importOriginal<typeof import('next/navigation')>()),
    redirect: mockRedirect,
    useRouter: () => ({
      push: mockPush,
      replace: mockReplace,
    }),
  }
})

vi.mock('next/headers', () => ({
  cookies: () => ({
    get: () => ({
      name: 'cookie',
      value: 'value',
    }),
  }),
}))

configure({ asyncUtilTimeout: 5000 })

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())

beforeEach(() => {
  vi.restoreAllMocks()
  localStorage.clear()
})
afterEach(() => server.resetHandlers())
