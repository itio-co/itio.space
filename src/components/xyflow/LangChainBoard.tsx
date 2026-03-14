import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { useSelector } from 'react-redux'
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
  addEdge,
  type Connection,
} from '@xyflow/react'

import '@xyflow/react/dist/style.css'
import { defaultNodeTypes, nodeColor, ExtendControls } from '@/components/xyflow/index'
import { langchainNodeTypes, langchainNodeColor } from '@/components/xyflow/langchain'
import { boards } from '@/constants/boards'
import { BoardService } from '@/services/board/BoardService'
import { FirebaseBoardRepository } from '@/adapters/board/FirebaseBoardRepository'
import { isValidConnection } from '@/helper/langchain/connectionValidator'
import { buildPipelineDefinition } from '@/helper/langchain/pipelineBuilder'
import { validatePipelineThunk, executePipelineThunk, resetExecution } from '@/redux/langchainSlice'
import { useAppDispatch, type RootState } from '@/redux/store'
import ExecutionResultOverlay from '@/components/xyflow/langchain/ExecutionResultOverlay'
import type { PromptNodeData } from '@/domain/langchain/types'

const rfStyle = { backgroundColor: 'white' }

type LangChainBoardProps = {
  boardId: string
}

const boardService = new BoardService(new FirebaseBoardRepository())

const NODE_PALETTE = [
  { type: 'lcPromptTemplate', label: '📝 Prompt', color: '#2196f3' },
  { type: 'lcLlm', label: '🧠 LLM', color: '#4caf50' },
  { type: 'lcChain', label: '🔗 Chain', color: '#9c27b0' },
  { type: 'lcTool', label: '🔧 Tool', color: '#ff9800' },
  { type: 'lcMemory', label: '💾 Memory', color: '#009688' },
  { type: 'lcOutputParser', label: '🔍 Parser', color: '#f44336' },
]

const DEFAULT_NODE_DATA: Record<string, Record<string, unknown>> = {
  lcLlm: { provider: 'openai', model: 'gpt-3.5-turbo', temperature: 0.7, maxTokens: 1024 },
  lcPromptTemplate: { template: '', inputVariables: [] },
  lcChain: { chainType: 'sequential', name: '' },
  lcTool: { toolType: 'calculator', config: {} },
  lcMemory: { memoryType: 'buffer', k: 5 },
  lcOutputParser: { parserType: 'string' },
}

const LangChainBoardComponent: React.FC<LangChainBoardProps> = ({ boardId }) => {
  const dispatch = useAppDispatch()
  const { execution, isValidating, validationErrors } = useSelector(
    (state: RootState) => state.langchain
  )

  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[])
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[])
  const [isBoardExist, setIsBoardExist] = useState(false)
  const [pipelineInputs, setPipelineInputs] = useState<Record<string, string>>({})
  const [newNodeType, setNewNodeType] = useState<string | null>(null)

  const { screenToFlowPosition } = useReactFlow()

  const allNodeTypes = useMemo(
    () => ({ ...defaultNodeTypes, ...langchainNodeTypes }),
    []
  )

  const allNodeColor = useCallback(
    (node: Node) => langchainNodeColor(node) ?? nodeColor(node),
    []
  )

  // Load board
  useEffect(() => {
    const fetchBoard = async () => {
      if (!boardId) return
      try {
        const board = await boardService.getBoard(boardId)
        if (board) {
          setNodes(board.nodes)
          setEdges(board.edges)
          setIsBoardExist(true)
        } else {
          const staticBoard = boards[boardId]
          if (staticBoard) {
            setNodes(staticBoard.nodes)
            setEdges(staticBoard.edges)
            setIsBoardExist(true)
            await boardService.createBoard(boardId, staticBoard.nodes, staticBoard.edges)
          } else {
            setIsBoardExist(false)
          }
        }
      } catch {
        const staticBoard = boards[boardId]
        if (staticBoard) {
          setNodes(staticBoard.nodes)
          setEdges(staticBoard.edges)
          setIsBoardExist(true)
        } else {
          setIsBoardExist(false)
        }
      }
    }
    fetchBoard()
  }, [boardId])

  // Extract input variables from prompt nodes for the input panel
  useEffect(() => {
    const promptNodes = nodes.filter((n) => n.type === 'lcPromptTemplate')
    const vars: string[] = []
    for (const node of promptNodes) {
      const data = node.data as unknown as PromptNodeData
      if (data.inputVariables) {
        vars.push(...data.inputVariables)
      }
    }
    const uniqueVars = [...new Set(vars)]
    setPipelineInputs((prev) => {
      const next: Record<string, string> = {}
      for (const v of uniqueVars) {
        next[v] = prev[v] || ''
      }
      return next
    })
  }, [nodes])

  // Update node execution status from execution result
  useEffect(() => {
    if (!execution) return
    if (execution.status === 'success' || execution.status === 'error') {
      const statusMap = new Map<string, string>()
      for (const log of execution.logs) {
        statusMap.set(log.nodeId, 'success')
      }
      if (execution.status === 'error') {
        const lastLog = execution.logs[execution.logs.length - 1]
        if (lastLog) statusMap.set(lastLog.nodeId, 'error')
      }
      setNodes((nds) =>
        nds.map((n) => {
          const status = statusMap.get(n.id)
          if (status) {
            return { ...n, data: { ...n.data, executionStatus: status } }
          }
          return n
        })
      )
      // Animate edges
      setEdges((eds) =>
        eds.map((e) => ({
          ...e,
          animated: execution.status === 'success',
        }))
      )
    } else if (execution.status === 'running') {
      setNodes((nds) =>
        nds.map((n) => ({ ...n, data: { ...n.data, executionStatus: 'idle' } }))
      )
    }
  }, [execution])

  const onConnect = useCallback(
    (connection: Connection) => {
      if (isValidConnection(connection, nodes)) {
        setEdges((eds) => addEdge(connection, eds))
      }
    },
    [nodes, setEdges]
  )

  const handleClick = (event: React.MouseEvent) => {
    if (newNodeType) {
      const position = screenToFlowPosition({ x: event.clientX, y: event.clientY }, { snapToGrid: true })
      const rand = Math.random().toString(36).substring(2, 10)
      const newNode: Node = {
        id: `${newNodeType}-${rand}`,
        type: newNodeType,
        position,
        data: { ...(DEFAULT_NODE_DATA[newNodeType] || {}) },
      }
      setNodes((nds) => [...nds, newNode])
      setNewNodeType(null)
      // Reset cursor
      const pane = document.querySelector('.react-flow__pane') as HTMLElement
      if (pane) pane.style.cursor = 'grab'
    }
  }

  const startAddNode = (type: string) => {
    setNewNodeType(type)
    const pane = document.querySelector('.react-flow__pane') as HTMLElement
    if (pane) pane.style.cursor = 'crosshair'
  }

  const handleValidate = () => {
    const pipeline = buildPipelineDefinition(nodes, edges)
    dispatch(validatePipelineThunk(pipeline))
  }

  const handleExecute = () => {
    const pipeline = buildPipelineDefinition(nodes, edges)
    dispatch(executePipelineThunk({ pipeline, inputs: pipelineInputs }))
  }

  const handleSave = async () => {
    if (!boardId) return
    try {
      await boardService.saveBoard(boardId, nodes, edges)
      alert('Board saved!')
    } catch (error: unknown) {
      console.error('Error saving board:', error)
      alert('Failed to save board.')
    }
  }

  const handleReset = () => {
    dispatch(resetExecution())
    setNodes((nds) =>
      nds.map((n) => ({ ...n, data: { ...n.data, executionStatus: 'idle' } }))
    )
    setEdges((eds) => eds.map((e) => ({ ...e, animated: false })))
  }

  const inputVariables = Object.keys(pipelineInputs)

  return (
    <div style={{ width: '100vw', height: 'calc(100dvh - 4rem)', display: 'flex' }}>
      {!isBoardExist ? (
        <div style={{ textAlign: 'center', padding: 16 }}>Board not found</div>
      ) : (
        <>
          {/* Left Panel — Node Palette */}
          <div
            style={{
              width: 160,
              background: '#f8f9fa',
              borderRight: '1px solid #e0e0e0',
              padding: 12,
              flexShrink: 0,
              overflow: 'auto',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 12 }}>Nodes</div>
            {NODE_PALETTE.map((item) => (
              <button
                key={item.type}
                onClick={() => startAddNode(item.type)}
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '8px 6px',
                  marginBottom: 6,
                  border: `2px solid ${item.color}`,
                  borderRadius: 6,
                  background: newNodeType === item.type ? item.color + '33' : 'white',
                  cursor: 'pointer',
                  fontSize: 12,
                  textAlign: 'left',
                }}
              >
                {item.label}
              </button>
            ))}
            <hr style={{ margin: '12px 0' }} />
            <button
              onClick={handleSave}
              style={{
                display: 'block',
                width: '100%',
                padding: '8px 6px',
                border: '1px solid #ccc',
                borderRadius: 6,
                background: 'white',
                cursor: 'pointer',
                fontSize: 12,
              }}
            >
              💾 Save Board
            </button>
          </div>

          {/* Center — Canvas */}
          <div style={{ flex: 1 }}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              snapToGrid
              snapGrid={[10, 10]}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onClick={handleClick}
              nodeTypes={allNodeTypes}
              isValidConnection={(connection) => isValidConnection(connection as Connection, nodes)}
              style={rfStyle}
            >
              <ExtendControls
                showZoom
                showFitView
                showInteractive
                position="bottom-left"
                orientation="horizontal"
                showZoomTo100
              />
              <MiniMap nodeColor={allNodeColor} nodeStrokeWidth={3} zoomable pannable />
              <Background variant={BackgroundVariant.Dots} gap={10} size={1} />
            </ReactFlow>
          </div>

          {/* Right Panel — Execution */}
          <div
            style={{
              width: 280,
              background: '#f8f9fa',
              borderLeft: '1px solid #e0e0e0',
              padding: 12,
              flexShrink: 0,
              overflow: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: 14 }}>Pipeline</div>

            <button
              onClick={handleValidate}
              disabled={isValidating}
              style={{
                padding: '8px 12px',
                border: '1px solid #2196f3',
                borderRadius: 6,
                background: '#e3f2fd',
                cursor: isValidating ? 'wait' : 'pointer',
                fontSize: 12,
              }}
            >
              {isValidating ? 'Validating...' : 'Validate Pipeline'}
            </button>

            {inputVariables.length > 0 && (
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 12, marginBottom: 4 }}>Inputs</div>
                {inputVariables.map((v) => (
                  <label key={v} style={{ display: 'block', marginBottom: 4, fontSize: 11 }}>
                    {v}
                    <input
                      type="text"
                      value={pipelineInputs[v] || ''}
                      onChange={(e) =>
                        setPipelineInputs((prev) => ({ ...prev, [v]: e.target.value }))
                      }
                      style={{ width: '100%', padding: 4, border: '1px solid #ccc', borderRadius: 4 }}
                    />
                  </label>
                ))}
              </div>
            )}

            <button
              onClick={handleExecute}
              disabled={execution?.status === 'running'}
              style={{
                padding: '8px 12px',
                border: '1px solid #4caf50',
                borderRadius: 6,
                background: '#e8f5e9',
                cursor: execution?.status === 'running' ? 'wait' : 'pointer',
                fontSize: 12,
              }}
            >
              {execution?.status === 'running' ? 'Running...' : 'Execute Pipeline'}
            </button>

            {(execution || validationErrors.length > 0) && (
              <button
                onClick={handleReset}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #999',
                  borderRadius: 6,
                  background: '#f5f5f5',
                  cursor: 'pointer',
                  fontSize: 11,
                }}
              >
                Clear Results
              </button>
            )}

            <ExecutionResultOverlay
              execution={execution}
              isValidating={isValidating}
              validationErrors={validationErrors}
            />
          </div>
        </>
      )}

      {/* Pulse animation for running nodes */}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
          100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }
      `}</style>
    </div>
  )
}

const LangChainBoardWithProvider: React.FC<LangChainBoardProps> = (props) => {
  return (
    <ReactFlowProvider>
      <LangChainBoardComponent {...props} />
    </ReactFlowProvider>
  )
}

export default LangChainBoardWithProvider
