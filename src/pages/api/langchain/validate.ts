// src/pages/api/langchain/validate.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PipelineDefinition, ValidationResult } from '@/domain/langchain/types'
import { hasCycle } from '@/helper/langchain/pipelineBuilder'
import { isValidConnection } from '@/helper/langchain/connectionValidator'

// Connection rules for validation
const CONNECTION_RULES: Record<string, string[]> = {
  lcPromptTemplate: ['lcLlm', 'lcChain'],
  lcLlm: ['lcOutputParser', 'lcChain', 'lcTool'],
  lcChain: ['lcOutputParser', 'lcLlm'],
  lcTool: ['lcChain', 'lcLlm'],
  lcMemory: ['lcLlm', 'lcChain'],
  lcOutputParser: [],
}

function validatePipeline(pipeline: PipelineDefinition): ValidationResult {
  const errors: string[] = []

  if (pipeline.nodes.length === 0) {
    errors.push('Pipeline must have at least one node')
    return { valid: false, errors }
  }

  // Check for cycles
  if (hasCycle(pipeline)) {
    errors.push('Pipeline contains a cycle — must be a DAG')
  }

  // Check required fields per node
  for (const node of pipeline.nodes) {
    switch (node.type) {
      case 'lcLlm':
        if (!node.data || !(node.data as Record<string, unknown>).provider) errors.push(`LLM node "${node.id}" is missing a provider`)
        if (!node.data || !(node.data as Record<string, unknown>).model) errors.push(`LLM node "${node.id}" is missing a model`)
        break
      case 'lcPromptTemplate':
        if (!node.data || !(node.data as Record<string, unknown>).template) errors.push(`Prompt node "${node.id}" is missing a template`)
        break
      case 'lcChain':
        if (!node.data || !(node.data as Record<string, unknown>).chainType) errors.push(`Chain node "${node.id}" is missing a chain type`)
        break
      case 'lcTool':
        if (!node.data || !(node.data as Record<string, unknown>).toolType) errors.push(`Tool node "${node.id}" is missing a tool type`)
        break
      case 'lcMemory':
        if (!node.data || !(node.data as Record<string, unknown>).memoryType) errors.push(`Memory node "${node.id}" is missing a memory type`)
        break
      case 'lcOutputParser':
        if (!node.data || !(node.data as Record<string, unknown>).parserType) errors.push(`Parser node "${node.id}" is missing a parser type`)
        break
    }
  }

  // Check connection validity
  const nodeMap = new Map(pipeline.nodes.map((n) => [n.id, n]))
  for (const edge of pipeline.edges) {
    const source = nodeMap.get(edge.source)
    const target = nodeMap.get(edge.target)
    if (!source || !target) {
      errors.push(`Edge references unknown node: ${edge.source} -> ${edge.target}`)
      continue
    }
    const allowed = CONNECTION_RULES[source.type] || []
    if (!allowed.includes(target.type)) {
      errors.push(`Invalid connection: ${source.type} cannot connect to ${target.type}`)
    }
  }

  return { valid: errors.length === 0, errors }
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { pipeline } = req.body as { pipeline: PipelineDefinition }

  if (!pipeline) {
    return res.status(400).json({ valid: false, errors: ['Missing pipeline definition'] })
  }

  const result = validatePipeline(pipeline)
  return res.status(200).json(result)
}
