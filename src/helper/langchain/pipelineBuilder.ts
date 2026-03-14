// src/helper/langchain/pipelineBuilder.ts
import type { Node, Edge } from '@xyflow/react'
import type { PipelineDefinition, PipelineNode, PipelineEdge, LangChainNodeType } from '@/domain/langchain/types'

const LANGCHAIN_NODE_TYPES: Set<string> = new Set([
  'lcLlm', 'lcPromptTemplate', 'lcChain', 'lcTool', 'lcMemory', 'lcOutputParser',
])

export function buildPipelineDefinition(nodes: Node[], edges: Edge[]): PipelineDefinition {
  const pipelineNodes: PipelineNode[] = nodes
    .filter((node) => LANGCHAIN_NODE_TYPES.has(node.type ?? ''))
    .map((node) => ({
      id: node.id,
      type: node.type as LangChainNodeType,
      data: node.data as unknown as PipelineNode['data'],
    }))

  const nodeIds = new Set(pipelineNodes.map((n) => n.id))

  const pipelineEdges: PipelineEdge[] = edges
    .filter((edge) => nodeIds.has(edge.source) && nodeIds.has(edge.target))
    .map((edge) => ({
      source: edge.source,
      target: edge.target,
      sourceHandle: edge.sourceHandle ?? undefined,
      targetHandle: edge.targetHandle ?? undefined,
    }))

  return { nodes: pipelineNodes, edges: pipelineEdges }
}

// Topological sort for execution order
export function topologicalSort(pipeline: PipelineDefinition): string[] {
  const { nodes, edges } = pipeline
  const inDegree = new Map<string, number>()
  const adjacency = new Map<string, string[]>()

  for (const node of nodes) {
    inDegree.set(node.id, 0)
    adjacency.set(node.id, [])
  }

  for (const edge of edges) {
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1)
    adjacency.get(edge.source)?.push(edge.target)
  }

  const queue: string[] = []
  for (const [id, degree] of inDegree) {
    if (degree === 0) queue.push(id)
  }

  const sorted: string[] = []
  while (queue.length > 0) {
    const current = queue.shift()!
    sorted.push(current)
    for (const neighbor of adjacency.get(current) || []) {
      const newDegree = (inDegree.get(neighbor) || 1) - 1
      inDegree.set(neighbor, newDegree)
      if (newDegree === 0) queue.push(neighbor)
    }
  }

  return sorted
}

// Check if the graph has cycles
export function hasCycle(pipeline: PipelineDefinition): boolean {
  const sorted = topologicalSort(pipeline)
  return sorted.length !== pipeline.nodes.length
}
