import React, { PropsWithChildren } from 'react'
import type { FC } from 'react'
import { useSelector } from 'react-redux'
import { usePathname } from 'next/navigation'
import { RootState, useAppDispatch } from '@/redux/store'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname() || '/'

  const dispatch = useAppDispatch()

  const { email } = useSelector((state: RootState) => state.user)

  const [isSetUserData, setIsSetUserData] = React.useState(true)

  const NO_HEADER_ROUTES: string[] = ['/', '/login', '/itio-space/certificate']

  const isHideHeader = NO_HEADER_ROUTES.includes(pathname)

  return (
    <div className="relative">
      {!isHideHeader && (
        <header className="flex justify-between border-b px-5 py-5">
          <div className="font-bold">Welcome to ITIO Space</div>
          <div>{email}</div>
        </header>
      )}
      <div>{isSetUserData ? children : null}</div>
    </div>
  )
}

export default MainLayout
