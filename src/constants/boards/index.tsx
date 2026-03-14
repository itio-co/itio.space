import { Node, Edge }from '@xyflow/react';
import * as demoBoard from './demoboard';
import * as langchainBoard from './langchain-board';

const emptyBoard = { nodes: [] as Node[], edges: [] as Edge[] };

type BoardDataType = {
  [key: string]: { nodes: Node[], edges: Edge[] };
};

export const boards: BoardDataType = {
  'demoboard': demoBoard,
  'space2': emptyBoard,
  'space3': emptyBoard,
  'space4': emptyBoard,
  'langchain': langchainBoard,
};
