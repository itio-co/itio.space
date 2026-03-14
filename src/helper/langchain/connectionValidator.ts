// src/helper/langchain/connectionValidator.ts
import type { Node, Connection } from '@xyflow/react'

// Connection rules: sourceType -> allowed target types
const CONNECTION_RULES: Record<string, string[]> = {
  lcPromptTemplate: ['lcLlm', 'lcChain'],
  lcLlm: ['lcOutputParser', 'lcChain', 'lcTool'],
  lcChain: ['lcOutputParser', 'lcLlm'],
  lcTool: ['lcChain', 'lcLlm'],
  lcMemory: ['lcLlm', 'lcChain'],
  lcOutputParser: [], // terminal node
}

const LANGCHAIN_TYPES = new Set(Object.keys(CONNECTION_RULES))

export function isValidConnection(connection: Connection, nodes: Node[]): boolean {
  const sourceNode = nodes.find((n) => n.id === connection.source)
  const targetNode = nodes.find((n) => n.id === connection.target)

  if (!sourceNode || !targetNode) return false

  const sourceType = sourceNode.type ?? ''
  const targetType = targetNode.type ?? ''

  // If neither node is a LangChain node, allow any connection (default xyflow behavior)
  if (!LANGCHAIN_TYPES.has(sourceType) && !LANGCHAIN_TYPES.has(targetType)) {
    return true
  }

  // If only one is a LangChain node, disallow cross-type connections
  if (!LANGCHAIN_TYPES.has(sourceType) || !LANGCHAIN_TYPES.has(targetType)) {
    return false
  }

  const allowedTargets = CONNECTION_RULES[sourceType] || []
  return allowedTargets.includes(targetType)
}
