'use client'
import { memo } from 'react'
import { Handle, Position, useReactFlow, type NodeProps, type Node } from '@xyflow/react'
import type { LlmNodeData } from '@/domain/langchain/types'

const MODELS: Record<string, string[]> = {
  openai: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
  anthropic: ['claude-3-opus', 'claude-3-sonnet', 'claude-3-haiku'],
}

export type LlmNode = Node<LlmNodeData, 'lcLlm'>

function LlmNodeComponent({ id, data, selected }: NodeProps<LlmNode>) {
  const { updateNodeData } = useReactFlow()
  const status = data.executionStatus ?? 'idle'

  const borderColor =
    status === 'running' ? '#4caf50' :
    status === 'success' ? '#4caf50' :
    status === 'error' ? '#f44336' : '#4caf50'

  return (
    <div
      style={{
        width: 220,
        minHeight: 120,
        border: `2px solid ${borderColor}`,
        background: '#e8f5e9',
        borderRadius: 8,
        padding: 12,
        fontSize: 12,
        animation: status === 'running' ? 'pulse 1.5s infinite' : undefined,
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#4caf50' }} />

      <div style={{ fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
        🧠 LLM
      </div>

      <label>
        Provider
        <select
          value={data.provider || 'openai'}
          onChange={(e) => updateNodeData(id, { ...data, provider: e.target.value, model: MODELS[e.target.value][0] })}
          style={{ width: '100%', marginBottom: 4 }}
        >
          <option value="openai">OpenAI</option>
          <option value="anthropic">Anthropic</option>
        </select>
      </label>

      <label>
        Model
        <select
          value={data.model || MODELS[data.provider || 'openai'][0]}
          onChange={(e) => updateNodeData(id, { ...data, model: e.target.value })}
          style={{ width: '100%', marginBottom: 4 }}
        >
          {(MODELS[data.provider || 'openai'] || []).map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>
      </label>

      <label>
        Temperature: {data.temperature ?? 0.7}
        <input
          type="range"
          min={0}
          max={2}
          step={0.1}
          value={data.temperature ?? 0.7}
          onChange={(e) => updateNodeData(id, { ...data, temperature: parseFloat(e.target.value) })}
          style={{ width: '100%' }}
        />
      </label>

      <label>
        Max Tokens
        <input
          type="number"
          value={data.maxTokens ?? 1024}
          onChange={(e) => updateNodeData(id, { ...data, maxTokens: parseInt(e.target.value) || 1024 })}
          style={{ width: '100%' }}
        />
      </label>

      <Handle type="source" position={Position.Bottom} style={{ background: '#4caf50' }} />
    </div>
  )
}

export default memo(LlmNodeComponent)
