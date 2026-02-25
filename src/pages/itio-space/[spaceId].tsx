import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import SpaceBoard from '@/components/xyflow/SpaceBoard'
import UserProfile from '@/components/auth/UserProfile'

export default function DemoBoard() {
  const [boardId, setBoardId] = useState('' as string)
  const router = useRouter()

  useEffect(() => {
    setBoardId(router.query.spaceId as string)
  }, [router])

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <UserProfile />
      </div>
      <SpaceBoard boardId={boardId} />
    </>
  )
}
