// src/ports/board/BoardRepository.ts
import { Board, Node, Edge } from '../../domain/board/types';

export interface BoardRepository {
  getBoard(id: string): Promise<Board | null>;
  saveBoard(id: string, nodes: Node[], edges: Edge[]): Promise<void>;
  createBoard(id: string, initialNodes: Node[], initialEdges: Edge[]): Promise<void>;
}
