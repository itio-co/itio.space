import React, { useRef, useEffect } from 'react'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { basicSetup } from 'codemirror'
import { sql } from '@codemirror/lang-sql'
import { oneDark } from '@codemirror/theme-one-dark'
import { defaultKeymap, indentWithTab } from '@codemirror/commands'

type DbmlEditorProps = {
  value: string
  onChange: (value: string) => void
}

const editorTheme = EditorView.theme({
  '&': {
    height: '100%',
    fontSize: '13px',
  },
  '.cm-scroller': {
    overflow: 'auto',
    fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  },
  '.cm-content': {
    padding: '8px 0',
  },
  '.cm-gutters': {
    background: 'rgba(15, 15, 30, 0.8)',
    border: 'none',
  },
})

const DbmlEditor: React.FC<DbmlEditorProps> = ({ value, onChange }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  useEffect(() => {
    if (!containerRef.current) return

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        keymap.of([...defaultKeymap, indentWithTab]),
        sql(),
        oneDark,
        editorTheme,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString())
          }
        }),
      ],
    })

    const view = new EditorView({
      state,
      parent: containerRef.current,
    })

    viewRef.current = view

    return () => {
      view.destroy()
    }
    // Only initialize once
  }, []) // eslint-disable-line

  return (
    <div
      ref={containerRef}
      className="h-full overflow-hidden"
      style={{ background: '#0f0f1e' }}
    />
  )
}

export default DbmlEditor
