import React, { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import type { NodeProps } from '@xyflow/react'
import { RiKey2Fill } from 'react-icons/ri'
import type { TableNodeData } from './utils/dbmlToReactFlow'
import { HEADER_HEIGHT, ROW_HEIGHT } from './utils/dbmlToReactFlow'

const TableNode = memo(({ data }: NodeProps) => {
  const { tableName, columns, headerColor } = data as TableNodeData

  return (
    <div
      className="rounded-lg overflow-hidden shadow-lg border border-white/10"
      style={{
        background: 'rgba(30, 30, 46, 0.95)',
        backdropFilter: 'blur(12px)',
        minWidth: 280,
      }}
    >
      {/* Table header */}
      <div
        className="px-3 py-2 font-semibold text-white text-sm tracking-wide"
        style={{
          background: `linear-gradient(135deg, ${headerColor}, ${headerColor}88)`,
          height: HEADER_HEIGHT,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {tableName}
      </div>

      {/* Column rows */}
      <div className="px-0">
        {columns.map((col, index) => (
          <div
            key={col.name}
            className="relative flex items-center gap-2 px-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-colors"
            style={{ height: ROW_HEIGHT }}
          >
            {/* Target handle (left side) */}
            <Handle
              type="target"
              position={Position.Left}
              id={`${tableName}.${col.name}.target`}
              style={{
                top: HEADER_HEIGHT + index * ROW_HEIGHT + ROW_HEIGHT / 2,
                background: headerColor,
                width: 8,
                height: 8,
                border: '2px solid rgba(30, 30, 46, 0.95)',
              }}
              isConnectable={false}
            />

            {/* PK icon */}
            <span className="w-4 flex-shrink-0">
              {col.isPrimaryKey && (
                <RiKey2Fill className="text-amber-400" size={14} />
              )}
            </span>

            {/* Column name */}
            <span className="text-slate-200 text-xs font-medium flex-1 truncate">
              {col.name}
            </span>

            {/* Type badge */}
            <span className="text-[10px] text-slate-400 bg-white/5 rounded px-1.5 py-0.5 font-mono">
              {col.type}
            </span>

            {/* Constraint indicators */}
            {col.isNotNull && (
              <span className="text-[9px] text-rose-400 font-bold">NN</span>
            )}
            {col.isUnique && !col.isPrimaryKey && (
              <span className="text-[9px] text-cyan-400 font-bold">UQ</span>
            )}

            {/* Source handle (right side) */}
            <Handle
              type="source"
              position={Position.Right}
              id={`${tableName}.${col.name}.source`}
              style={{
                top: HEADER_HEIGHT + index * ROW_HEIGHT + ROW_HEIGHT / 2,
                background: headerColor,
                width: 8,
                height: 8,
                border: '2px solid rgba(30, 30, 46, 0.95)',
              }}
              isConnectable={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
})

TableNode.displayName = 'TableNode'

export default TableNode
