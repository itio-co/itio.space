import React, { useMemo, useEffect } from 'react'
import {
  ReactFlow,
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react'
import type { Node, Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import TableNode from './TableNode'

type DbmlDiagramProps = {
  nodes: Node[]
  edges: Edge[]
}

const rfStyle = { backgroundColor: '#0d0d1a' }

const DbmlDiagramInner: React.FC<DbmlDiagramProps> = ({ nodes: propNodes, edges: propEdges }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[])
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[])
  const { fitView } = useReactFlow()

  const nodeTypes = useMemo(() => ({ tableNode: TableNode }), [])

  useEffect(() => {
    setNodes(propNodes)
    setEdges(propEdges)
    // Fit view after a short delay to let nodes render
    setTimeout(() => fitView({ padding: 0.2 }), 50)
  }, [propNodes, propEdges, setNodes, setEdges, fitView])

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      style={rfStyle}
      fitView
      minZoom={0.1}
      maxZoom={2}
      proOptions={{ hideAttribution: true }}
    >
      <Controls
        position="bottom-left"
        style={{
          background: 'rgba(30, 30, 46, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
        }}
      />
      <MiniMap
        style={{
          background: 'rgba(15, 15, 30, 0.9)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 8,
        }}
        nodeColor="#6366f1"
        maskColor="rgba(0, 0, 0, 0.5)"
      />
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#1e1e3a" />
    </ReactFlow>
  )
}

const DbmlDiagram: React.FC<DbmlDiagramProps> = (props) => {
  return (
    <ReactFlowProvider>
      <DbmlDiagramInner {...props} />
    </ReactFlowProvider>
  )
}

export default DbmlDiagram
