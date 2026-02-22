import { Node } from '@xyflow/react';

import ExtendControlsComponent from './ExtendControls';
export const ExtendControls = ExtendControlsComponent;

import * as TextUpdaterNode from './TextUpdaterNode';
import * as CounterNode from './CounterNode';
import * as CustomNode from './CustomNode';
import * as StickyNote from './StickyNote';
import type { NodeTypes } from '@xyflow/react';

export const defaultNodeTypes: NodeTypes = {
  textUpdater: TextUpdaterNode.default,
  counterNode: CounterNode.default,
  customNode: CustomNode.default,
  stickyNote: StickyNote.default,
};

// for MiniMap component color
export const nodeColor = (node: Node) => {
  switch (node.type) {
    case 'input':
      return '#6ede87';
    case 'output':
      return '#6865A5';
    case 'stickyNote':
      return StickyNote.nodeColor;
    default:
      return '#ff0072';
  }
};
