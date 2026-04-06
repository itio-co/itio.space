// src/ports/board/BoardSeedProvider.ts
import { Board } from '../../domain/board/types';

export interface BoardSeedProvider {
  getSeed(boardId: string): Omit<Board, 'id'> | null;
  hasSeed(boardId: string): boolean;
}
