// src/adapters/board/StaticBoardSeedProvider.ts
import { BoardSeedProvider } from '../../ports/board/BoardSeedProvider';
import { Board } from '../../domain/board/types';
import { boardSeeds } from '../../domain/board/seeds';

export class StaticBoardSeedProvider implements BoardSeedProvider {
  getSeed(boardId: string): Omit<Board, 'id'> | null {
    return boardSeeds[boardId] ?? null;
  }

  hasSeed(boardId: string): boolean {
    return boardId in boardSeeds;
  }
}
