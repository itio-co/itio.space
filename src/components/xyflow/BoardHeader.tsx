import React from 'react'
import {
  RiShareLine,
  RiPlayLine,
  RiSaveLine,
  RiMoreLine,
  RiExternalLinkLine,
} from 'react-icons/ri'

type BoardHeaderProps = {
  boardName: string
  onSave: () => void
}

const BoardHeader: React.FC<BoardHeaderProps> = ({ boardName, onSave }) => {
  return (
    <div className="board-header">
      {/* Left section - Logo + Board name */}
      <div className="board-header__left">
        <div className="board-header__logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="4" fill="#FFD02F" />
            <path d="M6 18V6h2.4l3.6 6 3.6-6H18v12h-2.4V10.2L12 16.2 8.4 10.2V18H6z" fill="#050038" />
          </svg>
        </div>
        <span className="board-header__board-name">{boardName}</span>
        <button className="board-header__icon-btn" title="More options">
          <RiMoreLine size={18} />
        </button>
        <button className="board-header__icon-btn" title="Share link">
          <RiExternalLinkLine size={18} />
        </button>
      </div>

      {/* Right section - Actions */}
      <div className="board-header__right">
        <button className="board-header__icon-btn" onClick={onSave} title="Save board">
          <RiSaveLine size={18} />
        </button>
        <button className="board-header__present-btn">
          <RiPlayLine size={16} />
          <span>Present</span>
        </button>
        <button className="board-header__share-btn">
          <RiShareLine size={16} />
          <span>Share</span>
        </button>
      </div>
    </div>
  )
}

export default BoardHeader
