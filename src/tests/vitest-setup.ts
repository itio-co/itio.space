import '@testing-library/jest-dom/vitest'

import { configure } from '@testing-library/react'

import { server } from './msw/server'

vi.stubEnv('NEXT_PUBLIC_API_ROOT', 'https://localhost.test')

// Mock next/navigation (for App Router)
vi.mock('next/navigation', async (importOriginal) => {
  const mockRedirect = vi.fn()
  const mockPush = vi.fn()
  const mockReplace = vi.fn()
  const mockSearchParams = { get: vi.fn(() => null) } // Default to return null

  return {
    ...(await importOriginal<typeof import('next/navigation')>()),
    redirect: mockRedirect,
    useRouter: () => ({
      push: mockPush,
      replace: mockReplace,
    }),
    useSearchParams: () => mockSearchParams,
  }
})

// Mock next/router (for Pages Router)
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    pathname: '/',
    query: {},
    asPath: '/',
    events: {
      on: vi.fn(),
      off: vi.fn(),
      emit: vi.fn(),
    },
  }),
}))

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
