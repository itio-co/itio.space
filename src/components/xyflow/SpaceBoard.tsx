import React, { useState, useEffect, useMemo } from 'react';

import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Background,
  BackgroundVariant,
  Node,
  Edge,
  Panel,
  useReactFlow,
  useEdgesState,
  useNodesState,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { defaultNodeTypes, nodeColor } from '@/components/xyflow/index'
import BoardToolbar from '@/components/xyflow/BoardToolbar'
import BoardHeader from '@/components/xyflow/BoardHeader'
import BoardZoomControls from '@/components/xyflow/BoardZoomControls'

import { boards } from '@/constants/boards'
import { BoardService } from '@/services/board/BoardService';
import { FirebaseBoardRepository } from '@/adapters/board/FirebaseBoardRepository';

const rfStyle = { backgroundColor: '#F5F5F5' }

type SpaceBoardComponentProps = {
  boardId: string
  userSlot?: React.ReactNode
}

type NewNodeValueType = {
  id: string
  type: string
}

const boardService = new BoardService(new FirebaseBoardRepository());

const SpaceBoardComponent: React.FC<SpaceBoardComponentProps> = (props) => {
  const { boardId, userSlot } = props

  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[])
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[])
  const [isBoardExist, setIsBoardExist] = useState(false)
  const [snapToGrid] = useState(true)
  const [gridGap] = useState(10)
  const [isIslandMode, setIsIslandMode] = useState(false)

  const { screenToFlowPosition } = useReactFlow()

  const [newNodeValue, setNewNodeValue] = useState<NewNodeValueType | null>(null)
  const [lasNewNodeId, setLastNewNodeId] = useState<string|null>(null)

  const nodeTypes = useMemo(
    () => ({
      ...defaultNodeTypes,
    }),
    []
  )

  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardId) return;

      try {
        const board = await boardService.getBoard(boardId);

        if (board) {
          setNodes(board.nodes);
          setEdges(board.edges);
          setIsBoardExist(true);
        } else {
           const staticBoard = boards[boardId];
           if (staticBoard) {
             setNodes(staticBoard.nodes);
             setEdges(staticBoard.edges);
             setIsBoardExist(true);

             if (boardId === 'demoboard') {
                 try {
                     await boardService.createBoard(boardId, staticBoard.nodes, staticBoard.edges);
                     console.log('Seeded demoboard to database');
                 } catch (seedError) {
                     console.error('Failed to seed demoboard', seedError);
                 }
             }

           } else {
             setIsBoardExist(false);
           }
        }
      } catch (error) {
        console.error("Failed to load board", error);
        const staticBoard = boards[boardId];
        if (staticBoard) {
          setNodes(staticBoard.nodes);
          setEdges(staticBoard.edges);
          setIsBoardExist(true);
        } else {
            setIsBoardExist(false);
        }
      }
    };

    fetchBoard();
  }, [boardId])

  const handleNodeDoubleClick = (event: React.MouseEvent, node: Node) => {
    const nodesCopy = nodes.map((n) => {
      if ('doubleClicked' in n.data && !n.selected && Object.getPrototypeOf('doubleClicked')) {
        const { doubleClicked, ...data } = n.data
        return { ...n, data: { ...data } }
      }
      if (n.id === node.id) {
        const doubleClicked: boolean = n.selected || false
        return { ...n, data: { ...n.data, doubleClicked } }
      }
      return n
    })
    setNodes(nodesCopy)
  }

  const clearOldAddNode = () => {
    if (lasNewNodeId) {
      const nodesCopy = nodes.map((n) => {
        if (n.id === lasNewNodeId) {
          const { doubleClicked, ...restData } = n.data
          return { ...n, data: { ...restData }, selected: false }
        }
        return n
      })
      setNodes(nodesCopy)
    }
    setLastNewNodeId(null)
  }

  function setCursor(cursor: string) {
    const elements = document.querySelectorAll('.react-flow__pane')
    if (elements.length > 0) {
      const element = elements[0] as HTMLElement
      element.style.cursor = cursor
    }
  }

  const startAddNote = ({ type }: { type: string }) => {
    const flow = document.getElementById('flow')
    if (flow) {
      setCursor('crosshair')
    }

    clearOldAddNode()

    const rand = Math.random().toString(36).substring(2, 10)
    setNewNodeValue({
      id: `${type}-${nodes.length}-${rand}`,
      type,
    })
  }

  const finishAddNote = () => {
    setCursor('grab')
  }

  const addNewNodeAt = (x: number, y: number) => {
    if (newNodeValue === null) {
      return
    }

    const { id, type } = newNodeValue
    const position = screenToFlowPosition({ x, y }, { snapToGrid })
    const newNode: Node = {
      id,
      type,
      position,
      selected: true,
      data: { doubleClicked: true },
    }
    setNodes([...nodes, newNode])
    setNewNodeValue(null)
    finishAddNote()
    setLastNewNodeId(id)
  }

  const handleClick = (event: React.MouseEvent) => {
    if (newNodeValue) {
      addNewNodeAt(event.clientX, event.clientY)
    }
  }

  const handleSaveBoard = async () => {
      if (!boardId) return;
      try {
          await boardService.saveBoard(boardId, nodes, edges);
          alert('Board saved successfully!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
          console.error('Error saving board:', error);
          if (error.code === 'permission-denied' || error.message.includes('permission-denied') || error.message.includes('Missing or insufficient permissions')) {
               alert('Permission denied. Please ensure you are logged in to save changes.');
          } else {
               alert('Failed to save board. ' + error.message);
          }
      }
  }

  const boardDisplayName = (boardId || '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())

  return (
    <div className={`board-layout ${isIslandMode ? 'board-layout--island' : ''}`} id="flow">
      {!isBoardExist ? (
        <div className="text-center p-4">Board not found</div>
      ) : (
        <>
          <BoardHeader
            boardName={boardDisplayName}
            onSave={handleSaveBoard}
            isIslandMode={isIslandMode}
            onToggleMode={() => setIsIslandMode(prev => !prev)}
            userSlot={userSlot}
          />
          <div className="board-layout__canvas">
            <BoardToolbar
              onAddStickyNote={() => startAddNote({ type: 'stickyNote' })}
              activeTool={newNodeValue ? 'stickyNote' : 'select'}
            />
            <div className="board-layout__flow">
              <ReactFlow
                nodes={nodes}
                edges={edges}
                snapToGrid={snapToGrid}
                snapGrid={[gridGap, gridGap]}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeDoubleClick={handleNodeDoubleClick}
                onClick={(event) => handleClick(event)}
                nodeTypes={nodeTypes}
                style={rfStyle}
                proOptions={{ hideAttribution: true }}
              >
                <Panel position="bottom-right">
                  <BoardZoomControls />
                </Panel>
                <MiniMap
                  nodeColor={nodeColor}
                  nodeStrokeWidth={3}
                  zoomable
                  pannable
                  style={{ bottom: 50, right: 12 }}
                />
                <Background variant={BackgroundVariant.Dots} gap={gridGap} size={1} />
              </ReactFlow>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

const SpaceBoardComponentWithProvider: React.FC<SpaceBoardComponentProps> = (props) => {
  return (
    <ReactFlowProvider>
      <SpaceBoardComponent {...props} />
    </ReactFlowProvider>
  )
}

export default SpaceBoardComponentWithProvider
