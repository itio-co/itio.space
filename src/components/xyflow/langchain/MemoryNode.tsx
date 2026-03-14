'use client'
import { memo } from 'react'
import { Handle, Position, useReactFlow, type NodeProps, type Node } from '@xyflow/react'
import type { MemoryNodeData } from '@/domain/langchain/types'

export type MemoryNode = Node<MemoryNodeData, 'lcMemory'>

function MemoryNodeComponent({ id, data }: NodeProps<MemoryNode>) {
  const { updateNodeData } = useReactFlow()
  const status = data.executionStatus ?? 'idle'

  const borderColor =
    status === 'running' ? '#009688' :
    status === 'success' ? '#4caf50' :
    status === 'error' ? '#f44336' : '#009688'

  return (
    <div
      style={{
        width: 220,
        minHeight: 120,
        border: `2px solid ${borderColor}`,
        background: '#e0f2f1',
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        animation: status === 'running' ? 'pulse 1.5s infinite' : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#009688' }} />

      <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
        💾 Memory
      </div>

      <label>
        Memory Type
        <select
          value={data.memoryType || 'buffer'}
          onChange={(e) => updateNodeData(id, { ...data, memoryType: e.target.value })}
          style={{ width: '100%', marginBottom: 4 }}
        >
          <option value="buffer">Buffer</option>
          <option value="summary">Summary</option>
          <option value="vectorStore">Vector Store</option>
        </select>
      </label>

      {(data.memoryType === 'buffer' || !data.memoryType) && (
        <label>
          Window Size (k)
          <input
            type="number"
            value={data.k ?? 5}
            onChange={(e) => updateNodeData(id, { ...data, k: parseInt(e.target.value) || 5 })}
            min={1}
            style={{ width: '100%' }}
          />
        </label>
      )}

      <Handle type="source" position={Position.Bottom} style={{ background: '#009688' }} />
    </div>
  )
}

export default memo(MemoryNodeComponent)
