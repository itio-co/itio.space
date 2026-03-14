import React, { PropsWithChildren } from 'react'
import type { FC } from 'react'
import { usePathname } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname() || '/'

  const NO_HEADER_ROUTES = ['/', '/login', '/itio-space/certificate']
  const NO_PROFILE_ROUTES = ['/login', '/itio-space/certificate']

  const isDynamicBoardRoute = /^\/itio-space\/[^/]+$/.test(pathname) && pathname !== '/itio-space'

  const isHideHeader = NO_HEADER_ROUTES.includes(pathname) || isDynamicBoardRoute
  const isHideProfile = NO_PROFILE_ROUTES.includes(pathname)

  return (
    <div className="relative">
      {!isHideHeader && (
        <header className="flex justify-between items-center border-b border-white/10 px-5 py-3">
          <div className="font-bold text-white">Welcome to ITIO Space</div>
          <UserProfile />
        </header>
      )}
      {isHideHeader && !isHideProfile && (
        <div className="fixed top-4 right-4 z-50">
          <UserProfile />
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default MainLayout
