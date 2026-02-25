// src/domain/board/types.ts
import { Node, Edge } from '@xyflow/react';

export interface Board {
  id: string;
  nodes: Node[];
  edges: Edge[];
}

export type { Node, Edge };
