import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import styled from "styled-components"
import { RiListUnordered, RiGridFill } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"

import { spaceList } from "@/constants/space-list"
import UserProfile from "@/components/auth/UserProfile"
import ThemeToggle from "@/components/common/ThemeToggle"
import { RootState, AppDispatch } from "@/redux/store"
import { checkUserDataFromLocalStorage } from "@/redux/userSlice"

type ViewMode = 'list' | 'thumbnails'

const MySpace = styled.main`
  margin: 0;
  min-height: 100vh;
  background: var(--background);
  color: var(--text-primary);
`
const HeaderBar = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--surface);
`
const HeaderTitle = styled.h1`
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
`
const Toolbar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.25rem;
  padding: 0.75rem 1rem 0;
`
const SpaceList = styled.div`
  padding: 1rem;
`

// Thumbnail view
const Grid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
`
const SpaceItem = styled.div``
const Preview = styled.div`
  width: 100%;
  padding-top: 100%;
  background: var(--surface-hover);
  border-radius: 8px;
`

// List view
const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`
const ListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem;
  border-radius: 0.375rem;
  &:hover {
    background: var(--surface-hover);
  }
`
const ListPreview = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background: var(--surface-hover);
  border-radius: 0.375rem;
  flex-shrink: 0;
`

// Shared
const Title = styled.span`
  font-size: 0.875rem;
  font-weight: 700;
  color: var(--text-primary);
`

const ViewButton = styled.button<{ $active: boolean }>`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.$active ? 'var(--surface-active)' : 'transparent')};
  color: var(--text-secondary);
  &:hover {
    background: var(--surface-hover);
  }
`

export default function MySpaceComponent() {
    const [viewMode, setViewMode] = useState<ViewMode>('list')
    const [authChecked, setAuthChecked] = useState(false)
    const user = useSelector((state: RootState) => state.user)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(checkUserDataFromLocalStorage()).then(() => {
            setAuthChecked(true)
        })
    }, [dispatch])

    useEffect(() => {
        if (authChecked && !user.token) {
            router.replace(`/login?redirect=${encodeURIComponent(router.asPath)}`)
        }
    }, [authChecked, user.token, router])

    if (!authChecked || !user.token) {
        return null
    }

    return (
        <MySpace>
            <HeaderBar>
                <HeaderTitle>My Spaces</HeaderTitle>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ThemeToggle />
                    <UserProfile />
                </div>
            </HeaderBar>
            <Toolbar>
                <ViewButton
                    $active={viewMode === 'list'}
                    onClick={() => setViewMode('list')}
                    aria-label="List view"
                >
                    <RiListUnordered size={18} />
                </ViewButton>
                <ViewButton
                    $active={viewMode === 'thumbnails'}
                    onClick={() => setViewMode('thumbnails')}
                    aria-label="Thumbnail view"
                >
                    <RiGridFill size={18} />
                </ViewButton>
            </Toolbar>
            <SpaceList>
                {viewMode === 'thumbnails' ? (
                    <Grid>
                        {spaceList.map((space) => (
                            <SpaceItem key={space.id}>
                                <Link href={`/itio-space/${space.id || ''}`}>
                                    <Preview />
                                    <Title>{space.name}</Title>
                                </Link>
                            </SpaceItem>
                        ))}
                    </Grid>
                ) : (
                    <ListContainer>
                        {spaceList.map((space) => (
                            <Link key={space.id} href={`/itio-space/${space.id || ''}`}>
                                <ListItem>
                                    <ListPreview />
                                    <Title>{space.name}</Title>
                                </ListItem>
                            </Link>
                        ))}
                    </ListContainer>
                )}
            </SpaceList>
        </MySpace>
    )
}