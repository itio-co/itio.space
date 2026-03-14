'use client'
import { memo, useEffect, useState } from 'react'
import { Node, NodeProps, NodeToolbar, Position, useReactFlow } from '@xyflow/react'

import tw from 'twin.macro'
import { StickyNoteColors, StickyNoteColorsObject } from '@/constants/sticky-note-colors'

const MainDiv = tw.div`
  h-36 w-36 p-2.5  // size and padding
  shadow-lg // shadow
  rounded-sm // border radius
  overflow-auto // scroll

  [> p]:text-black // text color
`
export const textStyle = tw`block w-full h-full bg-inherit focus:outline-none resize-none break-words`
const defaultBorderColor = 'transparent'

export type StickyNodeData = {
  label?: string
  colorName?: string
}

export type DoubleClickedData = {
  doubleClicked?: boolean
}

export type StickyNode = Node<StickyNodeData & DoubleClickedData, 'sticky-note'>

export type StickyNodeProps = NodeProps<StickyNode>

export const defaultColorName = 'yellow'

export const nodeColor = (node: Node) => {
  const colorName = (node.data as StickyNodeData)?.colorName || defaultColorName
  return StickyNoteColorsObject[colorName]?.backgroundColor || '#FFFACE'
}

function getColors(colorName?: string) {
  const entry = StickyNoteColorsObject[colorName || defaultColorName]
  return entry
    ? { borderColor: entry.color, backgroundColor: entry.backgroundColor }
    : { borderColor: '#ffeb3b', backgroundColor: '#ffface' }
}

export function StickyNode(props: StickyNodeProps) {
  const { id, data, selected } = props

  const { updateNodeData } = useReactFlow()

  const [label, setLabel] = useState(data?.label ?? '')
  const [editing, setEditing] = useState(false)

  const colors = getColors(data?.colorName)

  useEffect(() => {
    if (data.doubleClicked) {
      const newEditing = (selected || false) && (data.doubleClicked || false)
      setEditing(newEditing)

      // reset doubleClicked
      const { doubleClicked, ...rest } = data
      updateNodeData(id, { ...rest }, { replace: true })
    } else if (editing && !selected) {
      setEditing(false)
    }
  }, [data, selected])

  useEffect(() => {
    if (editing) {
      const textarea = document.querySelector(`textarea`)
      if (textarea) {
        textarea.focus()

        // set the cursor to cover the whole text
        const length = textarea.value.length
        textarea.setSelectionRange(0, length)
      }
    }
  }, [editing])

  const updateLabel = (newLabel: string) => {
    setLabel(newLabel)
    updateNodeData(id, { label: newLabel })
  }

  const handleColorSelect = (colorName: string) => {
    updateNodeData(id, { colorName })
  }

  return (
    <>
      <NodeToolbar
        isVisible={selected && !editing}
        position={Position.Top}
        offset={8}
      >
        <div
          className="nodrag"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            padding: '6px 8px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
            maxWidth: '200px',
          }}
        >
          {StickyNoteColors.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => handleColorSelect(c.name)}
              style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                backgroundColor: c.backgroundColor,
                border: `2px solid ${c.color}`,
                cursor: 'pointer',
                padding: 0,
                outline: data?.colorName === c.name ? `2px solid ${c.color}` : 'none',
                outlineOffset: '1px',
              }}
            />
          ))}
        </div>
      </NodeToolbar>
      <MainDiv
        id={id}
        className="nowheel"
        css={[
          `border: 2px solid ${selected ? colors.borderColor : defaultBorderColor};`, // border color
          `background-color: ${colors.backgroundColor};`, // background color
          `box-shadow: rgba(0, 0, 0, 0.1) -0.104698px 2.99817px 10px 0px;`,
        ]}
      >
        {!editing ? (
          <span css={[textStyle]}>{label.toString()}</span>
        ) : (
          <textarea
            className={`nowheel nodrag`}
            css={[textStyle]}
            defaultValue={label.toString()}
            onChange={(e) => updateLabel(e.target.value)}
          />
        )}
      </MainDiv>
    </>
  )
}

export default memo(StickyNode) as typeof StickyNode
