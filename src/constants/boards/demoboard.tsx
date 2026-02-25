// src/constants/demoboard/index.tsx

import { Node, Edge, Position }from '@xyflow/react';

type NodePosition = {
  x: number;
  y: number;
}

const g1: NodePosition = {
  x: 10,
  y: 500,
}

const transformPosition = (base: NodePosition, node: NodePosition) => {
  return {
    position: {
      x: base.x + node.x,
      y: base.y + node.y,
    }
  };
}

export const nodes: Node[] = [
    { id: '1', ...transformPosition(g1, { x: 10, y: 0 }), data: { label: 'From' } },
    { id: '2', ...transformPosition(g1, { x: 40, y: 100 }), data: { label: 'To' } },
  
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
      ...transformPosition(g1, { x: 450, y: 225 }),
      style: { backgroundColor: '#6ede87', color: 'white' },
    },
  
    {
      id: '12',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      ...transformPosition(g1, { x: 300, y: 325 }),
      style: { backgroundColor: '#ff0072', color: 'white' },
    },
    {
      id: '13',
      type: 'output',
      data: { label: 'Output Node' },
      ...transformPosition(g1, { x: 450, y: 450 }),
      style: { backgroundColor: '#6865A5', color: 'white' },
    },
  
    {
      id: 'node-1',
      type: 'textUpdater',
      ...transformPosition(g1, { x: 100, y: 500 }),
      data: { value: 123 },
    },
    {
      id: 'node-2',
      type: 'output',
      targetPosition: Position.Top,
      ...transformPosition(g1, { x: 100, y: 600 }),
      data: { label: 'node 2' },
    },
    {
      id: 'node-3',
      type: 'output',
      targetPosition: Position.Top,
      ...transformPosition(g1, { x: 300, y: 600 }),
      data: { label: 'node 3' },
    },

    {
      id: 'countter-1',
      type: 'counterNode',
      ...transformPosition(g1, { x: 100, y: 700 }),
      data: { initialCount: 10 },
    },

    {
      id: 'custom-1',
      type: 'customNode',
      ...transformPosition(g1, { x: 100, y: 800 }),
      data: { label: 'This is a custom node' },
    },

    {
      id: 'sticky-1',
      type: 'stickyNote',

      ...transformPosition(g1, { x: 100, y: 900 }),
      data: { label: 'This is a sticky note' },
    },
  ];

export const edges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: '+', type: 'step' },

  { id: 'e11-12', source: '11', target: '12' },
  { id: 'e12-13', source: '12', target: '13', animated: true },

  { id: 'edge-1', source: 'node-1', target: 'node-2', sourceHandle: 'a' },
  { id: 'edge-2', source: 'node-1', target: 'node-3', sourceHandle: 'b' },
];
