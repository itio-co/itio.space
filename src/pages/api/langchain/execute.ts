// src/pages/api/langchain/execute.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PipelineDefinition, PipelineExecution, StepLog, LlmNodeData, PromptNodeData, OutputParserNodeData } from '@/domain/langchain/types'
import { topologicalSort } from '@/helper/langchain/pipelineBuilder'
import { ChatOpenAI } from '@langchain/openai'
import { ChatAnthropic } from '@langchain/anthropic'
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers'

function buildLlm(data: LlmNodeData) {
  if (data.provider === 'openai') {
    return new ChatOpenAI({
      modelName: data.model || 'gpt-3.5-turbo',
      temperature: data.temperature ?? 0.7,
      maxTokens: data.maxTokens ?? 1024,
      openAIApiKey: process.env.OPENAI_API_KEY,
    })
  } else if (data.provider === 'anthropic') {
    return new ChatAnthropic({
      modelName: data.model || 'claude-3-sonnet',
      temperature: data.temperature ?? 0.7,
      maxTokens: data.maxTokens ?? 1024,
      anthropicApiKey: process.env.ANTHROPIC_API_KEY,
    })
  }
  throw new Error(`Unsupported LLM provider: ${data.provider}`)
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { pipeline, inputs } = req.body as {
    pipeline: PipelineDefinition
    inputs: Record<string, string>
  }

  if (!pipeline) {
    return res.status(400).json({ error: 'Missing pipeline definition' })
  }

  const executionId = `exec-${Date.now()}`
  const logs: StepLog[] = []
  const nodeOutputs = new Map<string, string>()

  try {
    const sortedNodeIds = topologicalSort(pipeline)
    const nodeMap = new Map(pipeline.nodes.map((n) => [n.id, n]))

    // Build adjacency for finding inputs
    const incomingEdges = new Map<string, string[]>()
    for (const edge of pipeline.edges) {
      const existing = incomingEdges.get(edge.target) || []
      existing.push(edge.source)
      incomingEdges.set(edge.target, existing)
    }

    for (const nodeId of sortedNodeIds) {
      const node = nodeMap.get(nodeId)
      if (!node) continue

      const startTime = Date.now()

      // Gather inputs from upstream nodes
      const upstreamIds = incomingEdges.get(nodeId) || []
      const upstreamOutputs = upstreamIds
        .map((id) => nodeOutputs.get(id))
        .filter(Boolean)
        .join('\n')

      const nodeInput = upstreamOutputs || JSON.stringify(inputs)
      let nodeOutput = ''

      switch (node.type) {
        case 'lcPromptTemplate': {
          const data = node.data as PromptNodeData
          const template = PromptTemplate.fromTemplate(data.template || '')
          // Merge upstream outputs with user inputs
          const allInputs = { ...inputs }
          const formatted = await template.format(allInputs)
          nodeOutput = formatted
          break
        }

        case 'lcLlm': {
          const data = node.data as LlmNodeData
          const llm = buildLlm(data)
          const response = await llm.invoke(nodeInput || 'Hello')
          nodeOutput = typeof response.content === 'string'
            ? response.content
            : JSON.stringify(response.content)
          break
        }

        case 'lcOutputParser': {
          const data = node.data as OutputParserNodeData
          if (data.parserType === 'string' || !data.parserType) {
            const parser = new StringOutputParser()
            nodeOutput = await parser.invoke(nodeInput)
          } else {
            // For other parser types, pass through for now
            nodeOutput = nodeInput
          }
          break
        }

        case 'lcTool': {
          // Tool execution placeholder — extend as needed
          nodeOutput = `[Tool output for input: ${nodeInput.substring(0, 100)}]`
          break
        }

        case 'lcMemory': {
          // Memory pass-through — extend with actual memory implementation
          nodeOutput = nodeInput
          break
        }

        case 'lcChain': {
          // Chain orchestrates its inputs — for now pass through
          nodeOutput = nodeInput
          break
        }

        default:
          nodeOutput = nodeInput
      }

      const durationMs = Date.now() - startTime
      nodeOutputs.set(nodeId, nodeOutput)
      logs.push({ nodeId, input: nodeInput, output: nodeOutput, durationMs })
    }

    // Get the last node's output as the final result
    const lastNodeId = sortedNodeIds[sortedNodeIds.length - 1]
    const finalResult = nodeOutputs.get(lastNodeId) || ''

    const result: PipelineExecution = {
      id: executionId,
      status: 'success',
      result: finalResult,
      logs,
    }

    return res.status(200).json(result)
  } catch (error) {
    const result: PipelineExecution = {
      id: executionId,
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      logs,
    }
    return res.status(500).json(result)
  }
}
