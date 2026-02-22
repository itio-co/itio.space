import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import SpaceBoard from '@/components/xyflow/SpaceBoard'

export default function DemoBoard() {
  const [boardId, setBoardId] = useState('' as string)
  const router = useRouter()

  useEffect(() => {
    setBoardId(router.query.spaceId as string)
  }, [router])

  return (
    <>
      <SpaceBoard boardId={boardId} />
    </>
  )
}
