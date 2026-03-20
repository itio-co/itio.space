import { useEffect, type ReactElement, type ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import clsx from 'clsx'
import ReduxProvider from '@/redux/ReduxProvider'
import { kuriousLoopedFont, notoSansFont } from '@/fonts'
import { MainLayout } from '../components/layout'
import GlobalStyles from '@/styles/GlobalStyles'
import ThemeProvider from '@/components/common/ThemeProvider'

import '@/styles/globals.css'

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  useEffect(() => {
    document.title = 'ITIO Space'
  }, [])

  return (
    <div className={clsx(kuriousLoopedFont.className, notoSansFont.variable)}>
      <ThemeProvider>
        <ReduxProvider>
          <MainLayout>
            <GlobalStyles />
            <Component {...pageProps} />
          </MainLayout>
        </ReduxProvider>
      </ThemeProvider>
    </div>
  )
}
