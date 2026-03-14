import React, { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { Node, Edge } from '@xyflow/react'
import { defaultDbml } from '@/constants/dbml-sample'
import { dbmlToReactFlow } from './utils/dbmlToReactFlow'
import DbmlDiagram from './DbmlDiagram'

const DbmlEditor = dynamic(() => import('./DbmlEditor'), { ssr: false })

const DEBOUNCE_MS = 300

const DbmlPlayground: React.FC = () => {
  const [dbmlText, setDbmlText] = useState(defaultDbml)
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [parseError, setParseError] = useState<string | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const parseAndUpdate = useCallback((text: string) => {
    const result = dbmlToReactFlow(text)
    if (result.error) {
      setParseError(result.error)
      // Keep last valid diagram visible
    } else {
      setParseError(null)
      setNodes(result.nodes)
      setEdges(result.edges)
    }
  }, [])

  // Parse on initial load
  useEffect(() => {
    parseAndUpdate(defaultDbml)
  }, [parseAndUpdate])

  // Debounced parsing on text change
  const handleChange = useCallback(
    (value: string) => {
      setDbmlText(value)
      if (timerRef.current) clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => {
        parseAndUpdate(value)
      }, DEBOUNCE_MS)
    },
    [parseAndUpdate],
  )

  return (
    <div className="flex h-screen w-screen" style={{ background: '#0a0a1a' }}>
      {/* Left panel: Editor */}
      <div className="flex flex-col" style={{ width: '40%', minWidth: 300 }}>
        {/* Editor header */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b border-white/10"
          style={{ background: 'rgba(15, 15, 30, 0.95)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-semibold text-sm">DBML</span>
            <span className="text-slate-500 text-xs">Editor</span>
          </div>
          <span className="text-slate-600 text-[10px] font-mono">dbml v2</span>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <DbmlEditor value={dbmlText} onChange={handleChange} />
        </div>

        {/* Error banner */}
        {parseError && (
          <div
            className="px-4 py-2 text-xs font-mono border-t border-red-500/30"
            style={{
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              maxHeight: 80,
              overflow: 'auto',
            }}
          >
            {parseError}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="w-px bg-white/10" />

      {/* Right panel: Diagram */}
      <div className="flex flex-col flex-1">
        {/* Diagram header */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b border-white/10"
          style={{ background: 'rgba(15, 15, 30, 0.95)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-semibold text-sm">Diagram</span>
            <span className="text-slate-500 text-xs">Preview</span>
          </div>
          <span className="text-slate-600 text-[10px]">
            {nodes.length} table{nodes.length !== 1 ? 's' : ''} &middot;{' '}
            {edges.length} relation{edges.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Diagram */}
        <div className="flex-1">
          {nodes.length === 0 && !parseError ? (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
              Write DBML on the left to see the diagram
            </div>
          ) : (
            <DbmlDiagram nodes={nodes} edges={edges} />
          )}
        </div>
      </div>
    </div>
  )
}

export default DbmlPlayground
