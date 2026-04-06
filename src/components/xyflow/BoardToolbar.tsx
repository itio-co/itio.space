import React, { useState, useRef, useEffect } from 'react'
import {
  RiCursorLine,
  RiStickyNoteAddLine,
  RiLayoutMasonryLine,
  RiShapeLine,
  RiText,
  RiChat3Line,
  RiBrushLine,
  RiApps2Line,
  RiAddLine,
  RiArrowGoBackLine,
  RiArrowGoForwardLine,
  RiCloseLine,
  RiToolsLine,
} from 'react-icons/ri'

type ToolItem = {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
  active?: boolean
}

type BoardToolbarProps = {
  onAddStickyNote: () => void
  activeTool?: string
}

const BoardToolbar: React.FC<BoardToolbarProps> = ({ onAddStickyNote, activeTool }) => {
  const [isOpen, setIsOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const tools: ToolItem[] = [
    { id: 'select', icon: <RiCursorLine size={20} />, label: 'Select' },
    { id: 'stickyNote', icon: <RiStickyNoteAddLine size={20} />, label: 'Sticky Note', onClick: onAddStickyNote },
    { id: 'frames', icon: <RiLayoutMasonryLine size={20} />, label: 'Frames' },
    { id: 'shapes', icon: <RiShapeLine size={20} />, label: 'Shapes' },
    { id: 'comment', icon: <RiChat3Line size={20} />, label: 'Comment' },
    { id: 'text', icon: <RiText size={20} />, label: 'Text' },
    { id: 'components', icon: <RiApps2Line size={20} />, label: 'Components' },
    { id: 'draw', icon: <RiBrushLine size={20} />, label: 'Draw' },
    { id: 'templates', icon: <RiLayoutMasonryLine size={20} />, label: 'Templates' },
  ]

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as HTMLElement)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handleToolClick = (tool: ToolItem) => {
    tool.onClick?.()
    setIsOpen(false)
  }

  return (
    <div className="board-toolbar" ref={popupRef}>
      {/* Floating toggle button */}
      <button
        className={`board-toolbar__toggle ${isOpen ? 'board-toolbar__toggle--active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Close tools' : 'Open tools'}
      >
        {isOpen ? <RiCloseLine size={22} /> : <RiToolsLine size={22} />}
      </button>

      {/* Popup tools menu */}
      {isOpen && (
        <div className="board-toolbar__popup">
          <div className="board-toolbar__popup-grid">
            {tools.map((tool) => (
              <button
                key={tool.id}
                className={`board-toolbar__popup-btn ${activeTool === tool.id ? 'board-toolbar__popup-btn--active' : ''}`}
                title={tool.label}
                onClick={() => handleToolClick(tool)}
              >
                {tool.icon}
                <span className="board-toolbar__popup-label">{tool.label}</span>
              </button>
            ))}
          </div>
          {/* Separator */}
          <div className="board-toolbar__popup-separator" />
          {/* Add more */}
          <button className="board-toolbar__popup-btn board-toolbar__popup-btn--add" title="More tools">
            <RiAddLine size={20} />
            <span className="board-toolbar__popup-label">More</span>
          </button>
          {/* Separator */}
          <div className="board-toolbar__popup-separator" />
          {/* Undo/Redo */}
          <div className="board-toolbar__popup-history">
            <button className="board-toolbar__popup-btn" title="Undo">
              <RiArrowGoBackLine size={18} />
              <span className="board-toolbar__popup-label">Undo</span>
            </button>
            <button className="board-toolbar__popup-btn" title="Redo">
              <RiArrowGoForwardLine size={18} />
              <span className="board-toolbar__popup-label">Redo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default BoardToolbar
