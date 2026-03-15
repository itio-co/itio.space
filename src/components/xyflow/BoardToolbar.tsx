import React from 'react'
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

  return (
    <div className="board-toolbar">
      {/* Main tools */}
      <div className="board-toolbar__tools">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`board-toolbar__btn ${activeTool === tool.id ? 'board-toolbar__btn--active' : ''}`}
            title={tool.label}
            onClick={tool.onClick}
          >
            {tool.icon}
          </button>
        ))}
        {/* Separator */}
        <div className="board-toolbar__separator" />
        {/* More / Add */}
        <button className="board-toolbar__btn board-toolbar__btn--add" title="More tools">
          <RiAddLine size={20} />
        </button>
      </div>

      {/* Undo/Redo at bottom */}
      <div className="board-toolbar__history">
        <button className="board-toolbar__btn" title="Undo">
          <RiArrowGoBackLine size={18} />
        </button>
        <button className="board-toolbar__btn" title="Redo">
          <RiArrowGoForwardLine size={18} />
        </button>
      </div>
    </div>
  )
}

export default BoardToolbar
