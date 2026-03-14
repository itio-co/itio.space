'use client'
import { memo, useMemo } from 'react'
import { Handle, Position, useReactFlow, type NodeProps, type Node } from '@xyflow/react'
import type { PromptNodeData } from '@/domain/langchain/types'

export type PromptTemplateNode = Node<PromptNodeData, 'lcPromptTemplate'>

function extractVariables(template: string): string[] {
  const matches = template.match(/\{(\w+)\}/g)
  if (!matches) return []
  return [...new Set(matches.map((m) => m.slice(1, -1)))]
}

function PromptTemplateNodeComponent({ id, data }: NodeProps<PromptTemplateNode>) {
  const { updateNodeData } = useReactFlow()
  const status = data.executionStatus ?? 'idle'

  const variables = useMemo(() => extractVariables(data.template || ''), [data.template])

  const borderColor =
    status === 'running' ? '#2196f3' :
    status === 'success' ? '#4caf50' :
    status === 'error' ? '#f44336' : '#2196f3'

  return (
    <div
      style={{
        width: 220,
        minHeight: 120,
        border: `2px solid ${borderColor}`,
        background: '#e3f2fd',
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        animation: status === 'running' ? 'pulse 1.5s infinite' : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#2196f3' }} />

      <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
        📝 Prompt Template
      </div>

      <label>
        Template
        <textarea
          value={data.template || ''}
          onChange={(e) => {
            const template = e.target.value
            const inputVariables = extractVariables(template)
            updateNodeData(id, { ...data, template, inputVariables })
          }}
          placeholder="Tell me about {topic} in {format}"
          rows={4}
          style={{ width: '100%', resize: 'vertical', fontFamily: 'monospace', fontSize: 11 }}
        />
      </label>

      {variables.length > 0 && (
        <div style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          {variables.map((v) => (
            <span
              key={v}
              style={{
                background: '#bbdefb',
                borderRadius: 4,
                padding: '2px 6px',
                fontSize: 10,
              }}
            >
              {`{${v}}`}
            </span>
          ))}
        </div>
      )}

      <Handle type="source" position={Position.Bottom} style={{ background: '#2196f3' }} />
    </div>
  )
}

export default memo(PromptTemplateNodeComponent)
