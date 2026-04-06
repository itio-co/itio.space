// src/domain/board/seeds.ts
// Seed data for boards - pure serializable data (no JSX, no React components)
// This data is used to initialize boards in persistence storage on first access.

import { Board } from './types';

type NodePosition = {
  x: number;
  y: number;
};

const g1: NodePosition = { x: 10, y: 500 };

const offsetPosition = (base: NodePosition, offset: NodePosition) => ({
  x: base.x + offset.x,
  y: base.y + offset.y,
});

const demoBoardSeed: Omit<Board, 'id'> = {
  nodes: [
    { id: '1', position: offsetPosition(g1, { x: 10, y: 0 }), data: { label: 'From' } },
    { id: '2', position: offsetPosition(g1, { x: 40, y: 100 }), data: { label: 'To' } },

    { id: '3', type: 'stickyNote', position: { x: 10, y: 100 }, data: { label: 'Welcome' } },
    { id: '4', type: 'stickyNote', position: { x: 170, y: 100 }, data: { label: 'to' } },
    { id: '5', type: 'stickyNote', position: { x: 330, y: 100 }, data: { label: 'Dev Space' } },
    { id: 'hello-jules', type: 'stickyNote', position: { x: 490, y: 100 }, data: { label: 'Hello, Jules' } },
    { id: '6', type: 'stickyNote', position: { x: 10, y: 270 }, data: { label: 'This is a sticky note' } },
    { id: '7', type: 'stickyNote', position: { x: 170, y: 270 }, data: { label: 'Drag me around' } },

    {
      id: '11',
      type: 'input',
      data: { label: 'Input Node' },
      position: offsetPosition(g1, { x: 450, y: 225 }),
      style: { backgroundColor: '#6ede87', color: 'white' },
    },
    {
      id: '12',
      data: { label: 'Default Node' },
      position: offsetPosition(g1, { x: 300, y: 325 }),
      style: { backgroundColor: '#ff0072', color: 'white' },
    },
    {
      id: '13',
      type: 'output',
      data: { label: 'Output Node' },
      position: offsetPosition(g1, { x: 450, y: 450 }),
      style: { backgroundColor: '#6865A5', color: 'white' },
    },

    {
      id: 'node-1',
      type: 'textUpdater',
      position: offsetPosition(g1, { x: 100, y: 500 }),
      data: { value: 123 },
    },
    {
      id: 'node-2',
      type: 'output',
      targetPosition: 'top',
      position: offsetPosition(g1, { x: 100, y: 600 }),
      data: { label: 'node 2' },
    },
    {
      id: 'node-3',
      type: 'output',
      targetPosition: 'top',
      position: offsetPosition(g1, { x: 300, y: 600 }),
      data: { label: 'node 3' },
    },

    {
      id: 'countter-1',
      type: 'counterNode',
      position: offsetPosition(g1, { x: 100, y: 700 }),
      data: { initialCount: 10 },
    },
    {
      id: 'custom-1',
      type: 'customNode',
      position: offsetPosition(g1, { x: 100, y: 800 }),
      data: { label: 'This is a custom node' },
    },
    {
      id: 'sticky-1',
      type: 'stickyNote',
      position: offsetPosition(g1, { x: 100, y: 900 }),
      data: { label: 'This is a sticky note' },
    },
  ],
  edges: [
    { id: 'e1-2', source: '1', target: '2', label: '+', type: 'step' },
    { id: 'e11-12', source: '11', target: '12' },
    { id: 'e12-13', source: '12', target: '13', animated: true },
    { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
    { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
  ],
};

const langchainBoardSeed: Omit<Board, 'id'> = {
  nodes: [
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
  ],
  edges: [
    { id: 'e-prompt-llm', source: 'prompt-1', target: 'llm-1' },
    { id: 'e-llm-parser', source: 'llm-1', target: 'parser-1' },
  ],
};

export const boardSeeds: Record<string, Omit<Board, 'id'>> = {
  demoboard: demoBoardSeed,
  langchain: langchainBoardSeed,
};
