// src/constants/boards/langchain-board.tsx
import { Node, Edge } from '@xyflow/react'

export const nodes: Node[] = [
  {
    id: 'prompt-1',
    type: 'lcPromptTemplate',
    position: { x: 100, y: 100 },
    data: {
      template: 'Tell me about {topic}',
      inputVariables: ['topic'],
    },
  },
  {
    id: 'llm-1',
    type: 'lcLlm',
    position: { x: 400, y: 80 },
    data: {
      provider: 'openai',
      model: 'gpt-3.5-turbo',
      temperature: 0.7,
      maxTokens: 1024,
    },
  },
  {
    id: 'parser-1',
    type: 'lcOutputParser',
    position: { x: 700, y: 100 },
    data: {
      parserType: 'string',
    },
  },
]

export const edges: Edge[] = [
  { id: 'e-prompt-llm', source: 'prompt-1', target: 'llm-1' },
  { id: 'e-llm-parser', source: 'llm-1', target: 'parser-1' },
]
