// src/services/langchain/LangChainService.ts
import { LangChainExecutionPort } from '../../ports/langchain/LangChainExecutionPort'
import { PipelineDefinition, PipelineExecution, PipelineNode, PipelineEdge, ValidationResult, LangChainNodeType } from '../../domain/langchain/types'
import { Node, Edge } from '@xyflow/react'

export class LangChainService {
  constructor(private readonly executionPort: LangChainExecutionPort) {}

  async executePipeline(
    pipeline: PipelineDefinition,
    inputs: Record<string, string>
  ): Promise<PipelineExecution> {
    try {
      return await this.executionPort.executePipeline(pipeline, inputs)
    } catch (error) {
      console.error('Error executing pipeline:', error)
      throw error
    }
  }

  async validatePipeline(
    pipeline: PipelineDefinition
  ): Promise<ValidationResult> {
    try {
      return await this.executionPort.validatePipeline(pipeline)
    } catch (error) {
      console.error('Error validating pipeline:', error)
      throw error
    }
  }

  buildPipelineFromBoard(nodes: Node[], edges: Edge[]): PipelineDefinition {
    const langchainNodeTypes: LangChainNodeType[] = [
      'lcLlm', 'lcPromptTemplate', 'lcChain', 'lcTool', 'lcMemory', 'lcOutputParser'
    ]

    const pipelineNodes: PipelineNode[] = nodes
      .filter(node => langchainNodeTypes.includes(node.type as LangChainNodeType))
      .map(node => ({
        id: node.id,
        type: node.type as LangChainNodeType,
        data: node.data as unknown as PipelineNode['data'],
      }))

    const pipelineNodeIds = new Set(pipelineNodes.map(n => n.id))

    const pipelineEdges: PipelineEdge[] = edges
      .filter(edge => pipelineNodeIds.has(edge.source) && pipelineNodeIds.has(edge.target))
      .map(edge => ({
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle ?? undefined,
        targetHandle: edge.targetHandle ?? undefined,
      }))

    return { nodes: pipelineNodes, edges: pipelineEdges }
  }
}
