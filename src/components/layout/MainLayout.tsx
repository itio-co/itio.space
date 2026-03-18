import { PropsWithChildren } from 'react'
import type { FC } from 'react'
import { usePathname } from 'next/navigation'
import UserProfile from '@/components/auth/UserProfile'
import useAuthListener from '@/hooks/useAuthListener'

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname() || '/'

  const NO_PROFILE_ROUTES = ['/login', '/itio-space/certificate']

  const isDynamicBoardRoute = /^\/itio-space\/[^/]+$/.test(pathname) && pathname !== '/itio-space'

  const isHideProfile = NO_PROFILE_ROUTES.includes(pathname)

  useAuthListener()

  return (
    <div className="relative">
      {!isHideProfile && !isDynamicBoardRoute && (
        <div className="fixed top-4 right-4 z-50">
          <UserProfile />
        </div>
      )}
      <div>{children}</div>
    </div>
  )
}

export default MainLayout
