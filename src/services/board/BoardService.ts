// src/services/board/BoardService.ts
import { BoardRepository } from '../../ports/board/BoardRepository';
import { BoardSeedProvider } from '../../ports/board/BoardSeedProvider';
import { Board, Node, Edge } from '../../domain/board/types';

export class BoardService {
  constructor(
    private readonly repository: BoardRepository,
    private readonly seedProvider?: BoardSeedProvider,
  ) {}

  async getBoard(id: string): Promise<Board | null> {
    return await this.repository.getBoard(id);
  }

  async saveBoard(id: string, nodes: Node[], edges: Edge[]): Promise<void> {
    await this.repository.saveBoard(id, nodes, edges);
  }

  async createBoard(id: string, initialNodes: Node[], initialEdges: Edge[]): Promise<void> {
    await this.repository.createBoard(id, initialNodes, initialEdges);
  }

  /**
   * Loads a board from persistence. If not found, checks for seed data
   * and persists it before returning. Returns null if no board or seed exists.
   */
  async getOrSeedBoard(id: string): Promise<Board | null> {
    const board = await this.repository.getBoard(id);
    if (board) return board;

    const seed = this.seedProvider?.getSeed(id);
    if (!seed) return null;

    await this.repository.createBoard(id, seed.nodes, seed.edges);
    return { id, nodes: seed.nodes, edges: seed.edges };
  }
}
