'use client'
import { memo } from 'react'
import { Handle, Position, useReactFlow, type NodeProps, type Node } from '@xyflow/react'
import type { ToolNodeData } from '@/domain/langchain/types'

export type ToolNode = Node<ToolNodeData, 'lcTool'>

const TOOL_CONFIG_FIELDS: Record<string, string[]> = {
  serpapi: ['apiKey'],
  calculator: [],
  custom: ['name', 'description', 'endpoint'],
}

function ToolNodeComponent({ id, data }: NodeProps<ToolNode>) {
  const { updateNodeData } = useReactFlow()
  const status = data.executionStatus ?? 'idle'
  const configFields = TOOL_CONFIG_FIELDS[data.toolType || 'calculator'] || []

  const borderColor =
    status === 'running' ? '#ff9800' :
    status === 'success' ? '#4caf50' :
    status === 'error' ? '#f44336' : '#ff9800'

  return (
    <div
      style={{
        width: 220,
        minHeight: 120,
        border: `2px solid ${borderColor}`,
        background: '#fff3e0',
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        animation: status === 'running' ? 'pulse 1.5s infinite' : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#ff9800' }} />

      <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
        🔧 Tool
      </div>

      <label>
        Tool Type
        <select
          value={data.toolType || 'calculator'}
          onChange={(e) => updateNodeData(id, { ...data, toolType: e.target.value, config: {} })}
          style={{ width: '100%', marginBottom: 4 }}
        >
          <option value="serpapi">SerpAPI</option>
          <option value="calculator">Calculator</option>
          <option value="custom">Custom</option>
        </select>
      </label>

      {configFields.map((field) => (
        <label key={field}>
          {field}
          <input
            type={field === 'apiKey' ? 'password' : 'text'}
            value={(data.config || {})[field] || ''}
            onChange={(e) =>
              updateNodeData(id, {
                ...data,
                config: { ...(data.config || {}), [field]: e.target.value },
              })
            }
            style={{ width: '100%', marginBottom: 4 }}
          />
        </label>
      ))}

      <Handle type="source" position={Position.Bottom} style={{ background: '#ff9800' }} />
    </div>
  )
}

export default memo(ToolNodeComponent)
