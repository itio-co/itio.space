// src/adapters/board/FirebaseBoardRepository.ts
import { db } from '@/config/firebase';
import { BoardRepository } from '../../ports/board/BoardRepository';
import { Board, Node, Edge } from '../../domain/board/types';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

export class FirebaseBoardRepository implements BoardRepository {
  private collectionName = 'boards';

  async getBoard(id: string): Promise<Board | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: id,
          nodes: data.nodes || [],
          edges: data.edges || [],
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting board:', error);
      throw error;
    }
  }

  async saveBoard(id: string, nodes: Node[], edges: Edge[]): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, { nodes, edges }, { merge: true });
    } catch (error) {
      console.error('Error saving board:', error);
      throw error;
    }
  }

  async createBoard(id: string, initialNodes: Node[], initialEdges: Edge[]): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, { nodes: initialNodes, edges: initialEdges });
    } catch (error) {
      console.error('Error creating board:', error);
      throw error;
    }
  }
}
