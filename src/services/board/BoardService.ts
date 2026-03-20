// src/services/board/BoardService.ts
import { BoardRepository } from '../../ports/board/BoardRepository';
import { Board, Node, Edge } from '../../domain/board/types';

export class BoardService {
  constructor(private readonly repository: BoardRepository) {}

  async getBoard(id: string): Promise<Board | null> {
    return await this.repository.getBoard(id);
  }

  async saveBoard(id: string, nodes: Node[], edges: Edge[]): Promise<void> {
    await this.repository.saveBoard(id, nodes, edges);
  }

  async createBoard(id: string, initialNodes: Node[], initialEdges: Edge[]): Promise<void> {
    await this.repository.createBoard(id, initialNodes, initialEdges);
  }
}
