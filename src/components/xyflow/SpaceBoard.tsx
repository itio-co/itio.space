import React, { useState, useEffect, useMemo, useCallback } from 'react';
import tw from 'twin.macro'
import { RiStickyNoteAddLine, RiSaveLine } from 'react-icons/ri'

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
import { defaultNodeTypes, nodeColor, ExtendControls } from '@/components/xyflow/index'

import { boards } from '@/constants/boards'
import Button from '@/components/common/Button'
import { BoardService } from '@/services/board/BoardService';
import { FirebaseBoardRepository } from '@/adapters/board/FirebaseBoardRepository';

// define the style of component
const rfStyle = { backgroundColor: 'white' }

const SpaceBoard = tw.div`w-[100vw] h-[calc(100dvh-4rem)]`


// define the props for the SpaceBoardComponent
type SpaceBoardComponentProps = {
  boardId: string
}

const AddStickyNoteButton = tw(Button)`block relative w-8 h-8 border-none text-black text-center`
const SaveButton = tw(Button)`block relative w-8 h-8 border-none text-black text-center`

type NewNodeValueType = {
  id: string
  type: string
}

const boardService = new BoardService(new FirebaseBoardRepository());

// define the SpaceBoardComponent
const SpaceBoardComponent: React.FC<SpaceBoardComponentProps> = (props) => {
  const { boardId } = props

  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[])
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[])
  const [isBoardExist, setIsBoardExist] = useState(false)
  const [snapToGrid] = useState(true)
  const [gridGap] = useState(10)

  const { screenToFlowPosition } = useReactFlow()

  const [newNodeValue, setNewNodeValue] = useState<NewNodeValueType | null>(null)
  const [lasNewNodeId, setLastNewNodeId] = useState<string|null>(null)

  const nodeTypes = useMemo(
    () => ({
      ...defaultNodeTypes,
    }),
    []
  )

  // load initial nodes and edges from constants when the component mounts
  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardId) return;

      try {
        // Try to load from Firebase
        const board = await boardService.getBoard(boardId);

        if (board) {
          setNodes(board.nodes);
          setEdges(board.edges);
          setIsBoardExist(true);
        } else {
           // Fallback to constants if not found in Firebase
           const staticBoard = boards[boardId];
           if (staticBoard) {
             setNodes(staticBoard.nodes);
             setEdges(staticBoard.edges);
             setIsBoardExist(true);
           } else {
             // If not in constants either, show not found
             setIsBoardExist(false);
           }
        }
      } catch (error) {
        console.error("Failed to load board", error);
        // Fallback to constants on error
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

// add new node feature
  const startAddNote = ({ type }: { type: string }) => {
    // set mouse interaction to crosshair
    const flow = document.getElementById('flow')
    if (flow) {
      setCursor('crosshair')
    }

    // clear old node id
    clearOldAddNode()

    // random id for the new node
    const rand = Math.random().toString(36).substring(2, 10)
    setNewNodeValue({
      id: `${type}-${nodes.length}-${rand}`,
      type,
    })
  }

  const finishAddNote = () => {
    // set mouse interaction to default
    setCursor('grab')
  }

  const addNewNodeAt = (x: number, y: number) => {
    // random id for the new node
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
          // Optional: Show success message
          alert('Board saved successfully!');
      } catch (error) {
          console.error('Error saving board:', error);
          alert('Failed to save board.');
      }
  }

  return (
    <SpaceBoard id="flow">
      {!isBoardExist ? (
        <div className="text-center p-4 ">Board not found</div>
      ) : (
        <div className="w-full h-full">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            snapToGrid={snapToGrid}
            snapGrid={[gridGap, gridGap]}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDoubleClick={handleNodeDoubleClick}
            onClick={(event) => handleClick(event)}
            // onPaneClick={(event) => handlePanClick(event)}
            // onConnect={onConnect}
            nodeTypes={nodeTypes}
            // fitView
            style={rfStyle}
          >
            <Panel position="top-left" className="flow">
              <div className="w-full h-full rounded-md bg-[whitesmoke]">
                <div className="flex flex-col items-center gap-2 py-2">
                  <AddStickyNoteButton onClick={() => startAddNote({ type: 'stickyNote' })} title="Add Sticky Note">
                    <RiStickyNoteAddLine size={28} />
                  </AddStickyNoteButton>
                  <SaveButton onClick={handleSaveBoard} title="Save Board">
                    <RiSaveLine size={28} />
                  </SaveButton>
                </div>
              </div>
            </Panel>
            {/*
          <Panel position="top-center">top-center</Panel>
          <Panel position="top-right">top-right</Panel>
          <Panel position="bottom-left">bottom-left</Panel>
          <Panel position="bottom-center">bottom-center</Panel>
          <Panel position="bottom-right">bottom-right</Panel> */}
            <ExtendControls
              showZoom={true}
              showFitView={true}
              showInteractive={true}
              position="bottom-left"
              orientation="horizontal"
              showZoomTo100={true}
            ></ExtendControls>
            <MiniMap nodeColor={nodeColor} nodeStrokeWidth={3} zoomable pannable />
            <Background variant={BackgroundVariant.Dots} gap={gridGap} size={1} />
          </ReactFlow>
        </div>
      )}
    </SpaceBoard>
  )
}

// wrapping with ReactFlowProvider is done outside of the component
const SpaceBoardComponentWithProvider: React.FC<SpaceBoardComponentProps> = (props) => {
  return (
    <ReactFlowProvider>
      <SpaceBoardComponent {...props} />
    </ReactFlowProvider>
  )
}

export default SpaceBoardComponentWithProvider
