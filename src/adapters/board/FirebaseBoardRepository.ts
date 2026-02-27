// src/adapters/board/FirebaseBoardRepository.ts
import { db } from '@/config/firebase';
import { BoardRepository } from '../../ports/board/BoardRepository';
import { Board, Node, Edge } from '../../domain/board/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React from 'react';

// Helper to sanitize objects for Firestore
// Removes undefined values and converts non-serializable objects (like React Elements)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sanitizeForFirestore = (obj: any): any => {
  if (obj === null || obj === undefined) {
    return null; // Firestore doesn't like undefined
  }

  // Check for React Element (basic check)
  if (React.isValidElement(obj)) {
    // We cannot save React components to Firestore.
    // Try to extract text content if possible, or just save a placeholder string.
    // For now, let's just save a string representation to avoid the crash.
    // If it has children that are strings, use that.
    const element = obj as React.ReactElement<{ children?: React.ReactNode }>;
    if (element.props && typeof element.props.children === 'string') {
        return element.props.children;
    }
    return "[React Component]";
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map(sanitizeForFirestore);
  }

  // Handle objects
  if (typeof obj === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newObj: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
        if (value !== undefined) {
             newObj[key] = sanitizeForFirestore(value);
        }
      }
    }
    return newObj;
  }

  return obj;
};

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
      const sanitizedNodes = sanitizeForFirestore(nodes);
      const sanitizedEdges = sanitizeForFirestore(edges);

      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, { nodes: sanitizedNodes, edges: sanitizedEdges }, { merge: true });
    } catch (error) {
      console.error('Error saving board:', error);
      throw error;
    }
  }

  async createBoard(id: string, initialNodes: Node[], initialEdges: Edge[]): Promise<void> {
    try {
      const sanitizedNodes = sanitizeForFirestore(initialNodes);
      const sanitizedEdges = sanitizeForFirestore(initialEdges);

      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, { nodes: sanitizedNodes, edges: sanitizedEdges });
    } catch (error) {
      console.error('Error creating board:', error);
      throw error;
    }
  }
}
