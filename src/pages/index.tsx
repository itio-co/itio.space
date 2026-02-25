// src/pages/index.tsx

import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

import TwinkleStars from '@/components/common/TwinkleStars'
import UserProfile from '@/components/auth/UserProfile'

export default function Index() {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.user)

  const handleGoToSpace = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    if (user.token) {
      router.push('/itio-space')
    } else {
      router.push('/login?redirect=/itio-space')
    }
  }

  return (
    <main className='main'>
      <div className="absolute top-4 right-4 z-10">
        <UserProfile />
      </div>
      <TwinkleStars />
      <h1 className='text-4xl leading-tight relative top-40'> Welcome to My Space!</h1>
      <div style={{
        top: '15rem',
        position: 'relative',
        paddingLeft: '2rem'
      }}>
        <Link href="/itio-space" onClick={handleGoToSpace} className="cursor-pointer text-blue-500 hover:text-blue-700 underline">Go to ITIO Space</Link>
      </div>
    </main>
  )
}
