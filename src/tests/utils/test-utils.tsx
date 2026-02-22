import React, { JSX, PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { MainLayout } from '@/components/layout'
import ReduxProvider from '@/redux/ReduxProvider'

export function renderWithProviders(ui: React.ReactElement, renderOptions = {}) {
  function Wrapper({ children }: PropsWithChildren<object>): JSX.Element {
    return (
      <ReduxProvider>
        <MainLayout>{children}</MainLayout>
      </ReduxProvider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
