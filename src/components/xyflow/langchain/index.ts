import type { Node, NodeTypes } from '@xyflow/react'

import LlmNode from './LlmNode'
import PromptTemplateNode from './PromptTemplateNode'
import ChainNode from './ChainNode'
import ToolNode from './ToolNode'
import MemoryNode from './MemoryNode'
import OutputParserNode from './OutputParserNode'

export const langchainNodeTypes: NodeTypes = {
  lcLlm: LlmNode,
  lcPromptTemplate: PromptTemplateNode,
  lcChain: ChainNode,
  lcTool: ToolNode,
  lcMemory: MemoryNode,
  lcOutputParser: OutputParserNode,
}

const NODE_COLORS: Record<string, string> = {
  lcLlm: '#4caf50',
  lcPromptTemplate: '#2196f3',
  lcChain: '#9c27b0',
  lcTool: '#ff9800',
  lcMemory: '#009688',
  lcOutputParser: '#f44336',
}

export const langchainNodeColor = (node: Node): string | undefined => {
  return NODE_COLORS[node.type ?? '']
}
