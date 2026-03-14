// src/domain/langchain/types.ts

export type LangChainNodeType =
  | 'lcLlm'
  | 'lcPromptTemplate'
  | 'lcChain'
  | 'lcTool'
  | 'lcMemory'
  | 'lcOutputParser'

export type LlmProvider = 'openai' | 'anthropic'

export interface LlmNodeData {
  [key: string]: unknown
  provider: LlmProvider
  model: string
  temperature: number
  maxTokens: number
  executionStatus?: ExecutionStatus
}

export interface PromptNodeData {
  [key: string]: unknown
  template: string
  inputVariables: string[]
  executionStatus?: ExecutionStatus
}

export type ChainType = 'sequential' | 'stuff' | 'router'

export interface ChainNodeData {
  [key: string]: unknown
  chainType: ChainType
  name: string
  executionStatus?: ExecutionStatus
}

export type ToolType = 'serpapi' | 'calculator' | 'custom'

export interface ToolNodeData {
  [key: string]: unknown
  toolType: ToolType
  config: Record<string, string>
  executionStatus?: ExecutionStatus
}

export type MemoryType = 'buffer' | 'summary' | 'vectorStore'

export interface MemoryNodeData {
  [key: string]: unknown
  memoryType: MemoryType
  k?: number
  executionStatus?: ExecutionStatus
}

export type ParserType = 'string' | 'json' | 'list' | 'structured'

export interface OutputParserNodeData {
  [key: string]: unknown
  parserType: ParserType
  schema?: string
  executionStatus?: ExecutionStatus
}

export type LangChainNodeData =
  | LlmNodeData
  | PromptNodeData
  | ChainNodeData
  | ToolNodeData
  | MemoryNodeData
  | OutputParserNodeData

export interface PipelineNode {
  id: string
  type: LangChainNodeType
  data: LangChainNodeData
}

export interface PipelineEdge {
  source: string
  target: string
  sourceHandle?: string
  targetHandle?: string
}

export interface PipelineDefinition {
  nodes: PipelineNode[]
  edges: PipelineEdge[]
}

export type ExecutionStatus = 'idle' | 'running' | 'success' | 'error'

export interface StepLog {
  nodeId: string
  input: string
  output: string
  durationMs: number
}

export interface PipelineExecution {
  id: string
  status: ExecutionStatus
  result?: string
  error?: string
  logs: StepLog[]
}

export interface ValidationResult {
  valid: boolean
  errors: string[]
}
