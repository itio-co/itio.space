import React, { useEffect, useRef, useState, useCallback } from 'react'
import { DiagramService } from '@/services/diagram/DiagramService'
import { FirebaseDiagramRepository } from '@/adapters/diagram/FirebaseDiagramRepository'

const DRAWIO_URL = 'https://embed.diagrams.net/?embed=1&ui=atlas&spin=1&proto=json&saveAndExit=0'
const DRAWIO_ORIGIN = 'https://embed.diagrams.net'

type DrawioBoardProps = {
  boardId: string
}

const diagramService = new DiagramService(new FirebaseDiagramRepository())

const DrawioBoard: React.FC<DrawioBoardProps> = ({ boardId }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const xmlRef = useRef<string>('')

  const sendMessage = useCallback((msg: object) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(msg), '*')
  }, [])

  // Load saved diagram on init
  const handleInit = useCallback(async () => {
    setIsReady(true)
    try {
      const diagram = await diagramService.getDiagram(boardId)
      if (diagram) {
        xmlRef.current = diagram.xml
      }
    } catch {
      // Start with empty diagram if load fails
    }
    sendMessage({ action: 'load', xml: xmlRef.current })
  }, [boardId, sendMessage])

  // Save diagram
  const handleSave = useCallback(
    async (xml: string) => {
      xmlRef.current = xml
      setSaveStatus('saving')
      try {
        await diagramService.saveDiagram(boardId, xml)
        setSaveStatus('saved')
        sendMessage({ action: 'status', messageKey: 'allChangesSaved', modified: false })
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch (error) {
        console.error('Error saving diagram:', error)
        setSaveStatus('idle')
      }
    },
    [boardId, sendMessage]
  )

  // Listen for postMessage events from draw.io iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== DRAWIO_ORIGIN) return

      let msg
      try {
        msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data
      } catch {
        return
      }

      switch (msg.event) {
        case 'init':
          handleInit()
          break
        case 'save':
          handleSave(msg.xml)
          break
        case 'autosave':
          handleSave(msg.xml)
          break
        case 'export':
          // Future: handle exported image for thumbnails
          break
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [handleInit, handleSave])

  return (
    <div style={{ width: '100vw', height: 'calc(100dvh - 4rem)', position: 'relative' }}>
      {!isReady && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#f8f9fa',
            zIndex: 10,
          }}
        >
          <span>Loading draw.io editor...</span>
        </div>
      )}

      {saveStatus === 'saving' && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '4px 12px',
            background: '#fff3cd',
            borderRadius: 4,
            fontSize: 12,
            zIndex: 20,
          }}
        >
          Saving...
        </div>
      )}

      {saveStatus === 'saved' && (
        <div
          style={{
            position: 'absolute',
            top: 8,
            right: 8,
            padding: '4px 12px',
            background: '#d4edda',
            borderRadius: 4,
            fontSize: 12,
            zIndex: 20,
          }}
        >
          Saved
        </div>
      )}

      <iframe
        ref={iframeRef}
        src={DRAWIO_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
        }}
        title="Draw.io Editor"
      />
    </div>
  )
}

export default DrawioBoard
