import Link from "next/link"
import tw from "twin.macro"

import { spaceList } from "@/constants/space-list"

const MySpace = tw.main`m-0`
const Toolbar = tw.div`flex justify-between items-center`
const SpaceList = tw.div`p-4`
const Grid = tw.div`grid gap-4 grid-cols-[repeat(auto-fill,minmax(200px,1fr))] `

const SpaceItem = tw.div``
const Preview = tw.div`w-full pt-[100%] bg-gray-400`
const Info = tw.div`flex justify-between items-center`
const Title = tw.span`text-sm font-bold`

export default function MySpaceComponent() {
    return (
        <MySpace>
            <Toolbar />
            <SpaceList>
                <Grid>
                    {spaceList.map((space) => (
                        <SpaceItem key={space.id}>
                            <Link href={`/itio-space/${space.id || ''}`}>
                                <Preview />
                                <Info>
                                    <Title>{space.name}</Title>
                                </Info>
                            </Link>
                        </SpaceItem>
                    ))}
                </Grid>
            </SpaceList>
        </MySpace>
    )
}