// src/services/board/BoardService.ts
import { BoardRepository } from '../../ports/board/BoardRepository';
import { Board, Node, Edge } from '../../domain/board/types';

export class BoardService {
  constructor(private readonly repository: BoardRepository) {}

  async getBoard(id: string): Promise<Board | null> {
    try {
      return await this.repository.getBoard(id);
    } catch (error) {
      console.error('Error fetching board:', error);
      throw error;
    }
  }

  async saveBoard(id: string, nodes: Node[], edges: Edge[]): Promise<void> {
    try {
      await this.repository.saveBoard(id, nodes, edges);
    } catch (error) {
      console.error('Error saving board:', error);
      throw error;
    }
  }

  async createBoard(id: string, initialNodes: Node[], initialEdges: Edge[]): Promise<void> {
    try {
      await this.repository.createBoard(id, initialNodes, initialEdges);
    } catch (error) {
      console.error('Error creating board:', error);
      throw error;
    }
  }
}
