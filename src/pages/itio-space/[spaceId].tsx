import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import SpaceBoard from '@/components/xyflow/SpaceBoard'
import LangChainBoard from '@/components/xyflow/LangChainBoard'
import DrawioBoard from '@/components/drawio/DrawioBoard'
import UserProfile from '@/components/auth/UserProfile'
import { spaceList, type BoardType } from '@/constants/space-list'

export default function DemoBoard() {
  const [boardId, setBoardId] = useState('' as string)
  const [boardType, setBoardType] = useState<BoardType>('space')
  const router = useRouter()

  useEffect(() => {
    const spaceId = router.query.spaceId as string
    setBoardId(spaceId)

    const space = spaceList.find((s) => s.id === spaceId)
    setBoardType(space?.boardType ?? 'space')
  }, [router])

  const userProfileSlot = <UserProfile />

  return (
    <>
      <div className="absolute top-4 right-4 z-50">
        <UserProfile />
      </div>
      {boardType === 'drawio' && <DrawioBoard boardId={boardId} />}
      {boardType === 'langchain' && (
        <>
          <div className="absolute top-4 right-4 z-50">
            <UserProfile />
          </div>
          <LangChainBoard boardId={boardId} />
        </>
      )}
      {boardType === 'space' && (
        <SpaceBoard boardId={boardId} userSlot={userProfileSlot} />
      )}
    </>
  )
}
