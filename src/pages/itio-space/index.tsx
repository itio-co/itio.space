import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import tw from "twin.macro"
import { RiListUnordered, RiGridFill } from "react-icons/ri"
import { useSelector, useDispatch } from "react-redux"

import { spaceList } from "@/constants/space-list"
import UserProfile from "@/components/auth/UserProfile"
import { RootState, AppDispatch } from "@/redux/store"
import { checkUserDataFromLocalStorage } from "@/redux/userSlice"

type ViewMode = 'list' | 'thumbnails'

const MySpace = tw.main`m-0`
const HeaderBar = tw.header`flex items-center justify-between px-4 py-3 border-b border-gray-200`
const HeaderTitle = tw.h1`text-lg font-semibold text-gray-800`
const Toolbar = tw.div`flex justify-end items-center gap-1 px-4 pt-3`
const SpaceList = tw.div`p-4`

// Thumbnail view
const Grid = tw.div`grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))]`
const SpaceItem = tw.div``
const Preview = tw.div`w-full pt-[100%] bg-gray-400`

// List view
const ListContainer = tw.div`flex flex-col gap-1`
const ListItem = tw.div`flex items-center gap-3 p-2 hover:bg-gray-100 rounded`
const ListPreview = tw.div`w-10 h-10 bg-gray-400 rounded shrink-0`

// Shared
const Title = tw.span`text-sm font-bold`

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
                <UserProfile />
            </HeaderBar>
            <Toolbar>
                <button
                    onClick={() => setViewMode('list')}
                    css={[
                        tw`p-2 rounded hover:bg-gray-200`,
                        viewMode === 'list' && tw`bg-gray-200`,
                    ]}
                    aria-label="List view"
                >
                    <RiListUnordered size={18} />
                </button>
                <button
                    onClick={() => setViewMode('thumbnails')}
                    css={[
                        tw`p-2 rounded hover:bg-gray-200`,
                        viewMode === 'thumbnails' && tw`bg-gray-200`,
                    ]}
                    aria-label="Thumbnail view"
                >
                    <RiGridFill size={18} />
                </button>
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