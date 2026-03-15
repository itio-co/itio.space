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

type MiroToolbarProps = {
  onAddStickyNote: () => void
  activeTool?: string
}

const MiroToolbar: React.FC<MiroToolbarProps> = ({ onAddStickyNote, activeTool }) => {
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
    <div className="miro-toolbar">
      {/* Main tools */}
      <div className="miro-toolbar__tools">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className={`miro-toolbar__btn ${activeTool === tool.id ? 'miro-toolbar__btn--active' : ''}`}
            title={tool.label}
            onClick={tool.onClick}
          >
            {tool.icon}
          </button>
        ))}
        {/* Separator */}
        <div className="miro-toolbar__separator" />
        {/* More / Add */}
        <button className="miro-toolbar__btn miro-toolbar__btn--add" title="More tools">
          <RiAddLine size={20} />
        </button>
      </div>

      {/* Undo/Redo at bottom */}
      <div className="miro-toolbar__history">
        <button className="miro-toolbar__btn" title="Undo">
          <RiArrowGoBackLine size={18} />
        </button>
        <button className="miro-toolbar__btn" title="Redo">
          <RiArrowGoForwardLine size={18} />
        </button>
      </div>
    </div>
  )
}

export default MiroToolbar
