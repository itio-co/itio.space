// src/constants/space-list.tsx

export type BoardType = 'space' | 'langchain' | 'drawio'

export type Space = {
    id: string;
    name: string;
    boardType: BoardType;
}

export const spaceList: Space[] = [
    {
        id: 'demoboard',
        name: 'Demo Board',
        boardType: 'space',
    },
    {
        id: 'space2',
        name: 'Space 2',
        boardType: 'space',
    },
    {
        id: 'space3',
        name: 'My Space 3',
        boardType: 'space',
    },
    {
        id: 'space4',
        name: 'My Space 4',
        boardType: 'space',
    },
    {
        id: 'langchain',
        name: 'LangChain Pipeline Builder',
        boardType: 'langchain',
    },
    {
        id: 'dbml',
        name: 'DBML Playground',
        boardType: 'space',
    },
    {
        id: 'drawio',
        name: 'Draw.io Diagrams',
        boardType: 'drawio',
    },
]