'use client'
import { memo } from 'react'
import { Handle, Position, useReactFlow, type NodeProps, type Node } from '@xyflow/react'
import type { ChainNodeData } from '@/domain/langchain/types'

export type ChainNode = Node<ChainNodeData, 'lcChain'>

function ChainNodeComponent({ id, data }: NodeProps<ChainNode>) {
  const { updateNodeData } = useReactFlow()
  const status = data.executionStatus ?? 'idle'

  const borderColor =
    status === 'running' ? '#9c27b0' :
    status === 'success' ? '#4caf50' :
    status === 'error' ? '#f44336' : '#9c27b0'

  return (
    <div
      style={{
        width: 220,
        minHeight: 120,
        border: `2px solid ${borderColor}`,
        background: '#f3e5f5',
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        animation: status === 'running' ? 'pulse 1.5s infinite' : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} id="input-0" style={{ background: '#9c27b0', left: '30%' }} />
      <Handle type="target" position={Position.Top} id="input-1" style={{ background: '#9c27b0', left: '70%' }} />

      <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
        🔗 Chain
      </div>

      <label>
        Chain Type
        <select
          value={data.chainType || 'sequential'}
          onChange={(e) => updateNodeData(id, { ...data, chainType: e.target.value })}
          style={{ width: '100%', marginBottom: 4 }}
        >
          <option value="sequential">Sequential</option>
          <option value="stuff">Stuff Documents</option>
          <option value="router">Router</option>
        </select>
      </label>

      <label>
        Name
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => updateNodeData(id, { ...data, name: e.target.value })}
          placeholder="My Chain"
          style={{ width: '100%' }}
        />
      </label>

      <Handle type="source" position={Position.Bottom} style={{ background: '#9c27b0' }} />
    </div>
  )
}

export default memo(ChainNodeComponent)
