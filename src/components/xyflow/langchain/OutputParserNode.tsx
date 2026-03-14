'use client'
import { memo } from 'react'
import { Handle, Position, useReactFlow, type NodeProps, type Node } from '@xyflow/react'
import type { OutputParserNodeData } from '@/domain/langchain/types'

export type OutputParserNode = Node<OutputParserNodeData, 'lcOutputParser'>

function OutputParserNodeComponent({ id, data }: NodeProps<OutputParserNode>) {
  const { updateNodeData } = useReactFlow()
  const status = data.executionStatus ?? 'idle'

  const borderColor =
    status === 'running' ? '#f44336' :
    status === 'success' ? '#4caf50' :
    status === 'error' ? '#f44336' : '#f44336'

  return (
    <div
      style={{
        width: 220,
        minHeight: 120,
        border: `2px solid ${borderColor}`,
        background: '#ffebee',
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        animation: status === 'running' ? 'pulse 1.5s infinite' : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#f44336' }} />

      <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
        🔍 Output Parser
      </div>

      <label>
        Parser Type
        <select
          value={data.parserType || 'string'}
          onChange={(e) => updateNodeData(id, { ...data, parserType: e.target.value })}
          style={{ width: '100%', marginBottom: 4 }}
        >
          <option value="string">String</option>
          <option value="json">JSON</option>
          <option value="list">List</option>
          <option value="structured">Structured</option>
        </select>
      </label>

      {data.parserType === 'structured' && (
        <label>
          JSON Schema
          <textarea
            value={data.schema || ''}
            onChange={(e) => updateNodeData(id, { ...data, schema: e.target.value })}
            placeholder='{"name": "string", "age": "number"}'
            rows={3}
            style={{ width: '100%', fontFamily: 'monospace', fontSize: 11 }}
          />
        </label>
      )}

      <Handle type="source" position={Position.Bottom} style={{ background: '#f44336' }} />
    </div>
  )
}

export default memo(OutputParserNodeComponent)
