import React, { useEffect, useState } from 'react'
import { useReactFlow, useStore } from '@xyflow/react'
import {
  RiSubtractLine,
  RiAddLine,
  RiQuestionLine,
} from 'react-icons/ri'
import { GoScreenNormal } from 'react-icons/go'

const zoomSelector = (s: { transform: [number, number, number] }) => s.transform[2]

const MiroZoomControls: React.FC = () => {
  const { zoomIn, zoomOut, fitView, zoomTo } = useReactFlow()
  const zoom = useStore(zoomSelector)
  const zoomPercentage = Math.round(zoom * 100)

  return (
    <div className="miro-zoom">
      <button className="miro-zoom__btn" onClick={() => fitView({ duration: 200 })} title="Fit to screen">
        <GoScreenNormal size={16} />
      </button>
      <div className="miro-zoom__separator" />
      <button className="miro-zoom__btn" onClick={() => zoomOut({ duration: 200 })} title="Zoom out">
        <RiSubtractLine size={16} />
      </button>
      <button
        className="miro-zoom__percentage"
        onClick={() => zoomTo(1, { duration: 200 })}
        title="Reset to 100%"
      >
        {zoomPercentage}%
      </button>
      <button className="miro-zoom__btn" onClick={() => zoomIn({ duration: 200 })} title="Zoom in">
        <RiAddLine size={16} />
      </button>
      <div className="miro-zoom__separator" />
      <button className="miro-zoom__btn" title="Help">
        <RiQuestionLine size={16} />
      </button>
    </div>
  )
}

export default MiroZoomControls
