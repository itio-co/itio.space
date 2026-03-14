import { Parser } from '@dbml/core'
import type { Node, Edge, MarkerType } from '@xyflow/react'

export type ColumnData = {
  name: string
  type: string
  isPrimaryKey: boolean
  isNotNull: boolean
  isUnique: boolean
  isIncrement: boolean
  defaultValue?: string
}

export type TableNodeData = {
  tableName: string
  columns: ColumnData[]
  headerColor: string
}

const TABLE_COLORS = [
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#f43f5e', // rose
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#f59e0b', // amber
  '#10b981', // emerald
]

const COLUMN_WIDTH = 350
const HEADER_HEIGHT = 40
const ROW_HEIGHT = 28
const GRID_GAP_X = 400
const GRID_GAP_Y_PADDING = 60
const COLUMNS_PER_ROW = 3

type ParseResult = {
  nodes: Node[]
  edges: Edge[]
  error: string | null
}

export function dbmlToReactFlow(dbmlText: string): ParseResult {
  if (!dbmlText.trim()) {
    return { nodes: [], edges: [], error: null }
  }

  try {
    const database = Parser.parse(dbmlText, 'dbmlv2')
    const schema = database.schemas[0]
    if (!schema) {
      return { nodes: [], edges: [], error: null }
    }

    const tables = schema.tables || []
    const refs = schema.refs || []

    // Build nodes
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodes: Node[] = tables.map((table: any, index: number) => {
      const col = index % COLUMNS_PER_ROW
      const row = Math.floor(index / COLUMNS_PER_ROW)

      // Calculate y position based on tallest table in previous rows
      const y = row * (getMaxTableHeight(tables, row, COLUMNS_PER_ROW) + GRID_GAP_Y_PADDING)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const columns: ColumnData[] = (table.fields || []).map((field: any) => ({
        name: field.name,
        type: field.type?.type_name || 'unknown',
        isPrimaryKey: !!field.pk,
        isNotNull: !!field.not_null,
        isUnique: !!field.unique,
        isIncrement: !!field.increment,
        defaultValue: field.dbdefault?.value,
      }))

      return {
        id: table.name,
        type: 'tableNode',
        position: { x: col * GRID_GAP_X, y },
        data: {
          tableName: table.name,
          columns,
          headerColor: TABLE_COLORS[index % TABLE_COLORS.length],
        } satisfies TableNodeData,
      }
    })

    // Build edges from refs
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const edges: Edge[] = refs.map((ref: any, index: number) => {
      const [ep0, ep1] = ref.endpoints
      // ep0 is the "1" side (referenced), ep1 is the "*" side (referencing)
      const sourceTable = ep1.tableName
      const sourceField = ep1.fieldNames?.[0] || ''
      const targetTable = ep0.tableName
      const targetField = ep0.fieldNames?.[0] || ''

      const relationLabel =
        ep0.relation === '1' && ep1.relation === '*'
          ? '1:N'
          : ep0.relation === '1' && ep1.relation === '1'
            ? '1:1'
            : ep0.relation === '*' && ep1.relation === '*'
              ? 'N:N'
              : `${ep0.relation}:${ep1.relation}`

      return {
        id: `ref-${index}`,
        source: sourceTable,
        sourceHandle: `${sourceTable}.${sourceField}.source`,
        target: targetTable,
        targetHandle: `${targetTable}.${targetField}.target`,
        type: 'smoothstep',
        animated: true,
        label: relationLabel,
        labelStyle: { fill: '#94a3b8', fontSize: 11, fontWeight: 600 },
        labelBgStyle: { fill: '#1e1e2e', fillOpacity: 0.8 },
        style: { stroke: '#6366f1', strokeWidth: 2 },
        markerEnd: { type: 'arrowclosed' as MarkerType, color: '#6366f1' },
      }
    })

    return { nodes, edges, error: null }
  } catch (e: unknown) {
    return { nodes: [], edges: [], error: e instanceof Error ? e.message : 'Failed to parse DBML' }
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getMaxTableHeight(tables: any[], targetRow: number, columnsPerRow: number): number {
  if (targetRow === 0) return 0

  let maxHeight = 0
  const prevRow = targetRow - 1
  const startIdx = prevRow * columnsPerRow
  const endIdx = Math.min(startIdx + columnsPerRow, tables.length)

  for (let i = startIdx; i < endIdx; i++) {
    const fieldCount = tables[i]?.fields?.length || 0
    const height = HEADER_HEIGHT + fieldCount * ROW_HEIGHT + 16
    if (height > maxHeight) maxHeight = height
  }

  return maxHeight || 200
}

export { HEADER_HEIGHT, ROW_HEIGHT, COLUMN_WIDTH }
