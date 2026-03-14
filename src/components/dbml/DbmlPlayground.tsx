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
  const [activeTab, setActiveTab] = useState<'editor' | 'diagram'>('editor')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const parseAndUpdate = useCallback((text: string) => {
    const result = dbmlToReactFlow(text)
    if (result.error) {
      setParseError(result.error)
    } else {
      setParseError(null)
      setNodes(result.nodes)
      setEdges(result.edges)
    }
  }, [])

  useEffect(() => {
    parseAndUpdate(defaultDbml)
  }, [parseAndUpdate])

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

  const statsText = `${nodes.length} table${nodes.length !== 1 ? 's' : ''} \u00B7 ${edges.length} relation${edges.length !== 1 ? 's' : ''}`

  const errorBanner = parseError ? (
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
  ) : null

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen" style={{ background: '#0a0a1a' }}>
      {/* Mobile tab bar — hidden on md+ */}
      <div
        className="flex md:hidden border-b border-white/10 shrink-0"
        style={{ background: 'rgba(15, 15, 30, 0.95)' }}
      >
        <button
          className="flex-1 px-4 py-2.5 text-sm font-semibold transition-colors"
          style={{
            color: activeTab === 'editor' ? '#818cf8' : '#64748b',
            borderBottom: activeTab === 'editor' ? '2px solid #818cf8' : '2px solid transparent',
            background: 'transparent',
          }}
          onClick={() => setActiveTab('editor')}
        >
          Editor
        </button>
        <button
          className="flex-1 px-4 py-2.5 text-sm font-semibold transition-colors"
          style={{
            color: activeTab === 'diagram' ? '#818cf8' : '#64748b',
            borderBottom: activeTab === 'diagram' ? '2px solid #818cf8' : '2px solid transparent',
            background: 'transparent',
          }}
          onClick={() => setActiveTab('diagram')}
        >
          Diagram
          <span className="ml-2 text-[10px] text-slate-600">{statsText}</span>
        </button>
      </div>

      {/* Editor panel */}
      <div
        className={`flex-col overflow-hidden md:flex ${activeTab === 'editor' ? 'flex' : 'hidden'}`}
        style={{ flex: '1 1 0%' }}
      >
        {/* Desktop editor header — hidden on mobile */}
        <div
          className="hidden md:flex items-center justify-between px-4 py-2 border-b border-white/10 shrink-0"
          style={{ background: 'rgba(15, 15, 30, 0.95)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-semibold text-sm">DBML</span>
            <span className="text-slate-500 text-xs">Editor</span>
          </div>
          <span className="text-slate-600 text-[10px] font-mono">dbml v2</span>
        </div>

        <div className="flex-1 overflow-hidden">
          <DbmlEditor value={dbmlText} onChange={handleChange} />
        </div>
        {errorBanner}
      </div>

      {/* Desktop divider — hidden on mobile */}
      <div className="hidden md:block w-px bg-white/10" />

      {/* Diagram panel */}
      <div
        className={`flex-col overflow-hidden md:flex ${activeTab === 'diagram' ? 'flex' : 'hidden'}`}
        style={{ flex: '1.5 1 0%' }}
      >
        {/* Desktop diagram header — hidden on mobile */}
        <div
          className="hidden md:flex items-center justify-between px-4 py-2 border-b border-white/10 shrink-0"
          style={{ background: 'rgba(15, 15, 30, 0.95)' }}
        >
          <div className="flex items-center gap-2">
            <span className="text-indigo-400 font-semibold text-sm">Diagram</span>
            <span className="text-slate-500 text-xs">Preview</span>
          </div>
          <span className="text-slate-600 text-[10px]">{statsText}</span>
        </div>

        <div className="flex-1">
          {nodes.length === 0 && !parseError ? (
            <div className="flex items-center justify-center h-full text-slate-500 text-sm">
              Write DBML to see the diagram
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
