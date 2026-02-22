// src/pages/index.tsx

import Link from 'next/link'

import TwinkleStars from '@/components/common/TwinkleStars'

export default function Index() {
  return (
    <main className='main'>
      <TwinkleStars />
      <h1 className='text-4xl leading-tight relative top-40'> Welcome to My Space!</h1>
      <div style={{
        top: '15rem',
        position: 'relative',
        paddingLeft: '2rem'
      }}>
        <Link href="/itio-space">Go to ITIO Space</Link>
      </div>
    </main>
  )
}
