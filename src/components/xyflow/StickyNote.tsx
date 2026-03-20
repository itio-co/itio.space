'use client'
import { memo, useEffect, useRef, useState } from 'react'
import { Node, NodeProps, NodeToolbar, Position, useReactFlow } from '@xyflow/react'
import { RiPencilLine, RiDeleteBinLine } from 'react-icons/ri'

import tw from 'twin.macro'
import { StickyNoteColors, StickyNoteColorsObject } from '@/constants/sticky-note-colors'

const MainDiv = tw.div`
  h-36 w-36 p-2.5  // size and padding
  shadow-lg // shadow
  rounded-sm // border radius
  overflow-auto // scroll
  text-black // force black text (board content, not themed)
`
export const textStyle = tw`block w-full h-full bg-inherit focus:outline-none resize-none break-words text-black`
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

  const { updateNodeData, deleteElements } = useReactFlow()

  const [label, setLabel] = useState(data?.label ?? '')
  const [editing, setEditing] = useState(false)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const colors = getColors(data?.colorName)

  // Reset color picker when deselected
  useEffect(() => {
    if (!selected) {
      setShowColorPicker(false)
    }
  }, [selected])

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
      setShowColorPicker(false)
      const textarea = document.querySelector(`textarea`)
      if (textarea) {
        textarea.focus()

        // set the cursor to cover the whole text
        const length = textarea.value.length
        textarea.setSelectionRange(0, length)
      }
    }
  }, [editing])

  // Click outside to close color picker
  useEffect(() => {
    if (!showColorPicker) return

    const handleClickOutside = (e: MouseEvent) => {
      if (colorPickerRef.current && !colorPickerRef.current.contains(e.target as HTMLElement)) {
        setShowColorPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showColorPicker])

  const updateLabel = (newLabel: string) => {
    setLabel(newLabel)
    updateNodeData(id, { label: newLabel })
  }

  const handleColorSelect = (colorName: string) => {
    updateNodeData(id, { colorName })
    setShowColorPicker(false)
  }

  const handleEdit = () => {
    updateNodeData(id, { ...data, doubleClicked: true })
  }

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] })
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
          style={{ position: 'relative' }}
        >
          {/* Menu Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
          >
            {/* Color indicator button */}
            <button
              onClick={() => setShowColorPicker(!showColorPicker)}
              title="Change color"
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: showColorPicker ? '#f0f0f0' : 'transparent',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <span
                style={{
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: colors.backgroundColor,
                  border: `2px solid ${colors.borderColor}`,
                  display: 'block',
                }}
              />
            </button>

            {/* Edit button */}
            <button
              onClick={handleEdit}
              title="Edit"
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <RiPencilLine size={16} />
            </button>

            {/* Delete button */}
            <button
              onClick={handleDelete}
              title="Delete"
              style={{
                width: '28px',
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '4px',
                border: 'none',
                backgroundColor: 'transparent',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <RiDeleteBinLine size={16} />
            </button>
          </div>

          {/* Color Picker Popover */}
          {showColorPicker && (
            <div
              ref={colorPickerRef}
              style={{
                position: 'absolute',
                top: '100%',
                left: '0',
                marginTop: '4px',
                display: 'grid',
                gridTemplateColumns: 'repeat(6, 1fr)',
                gap: '4px',
                padding: '8px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                zIndex: 10,
              }}
            >
              {StickyNoteColors.map((c) => (
                <button
                  key={c.name}
                  title={c.name}
                  onClick={() => handleColorSelect(c.name)}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    backgroundColor: c.backgroundColor,
                    border: `2px solid ${c.color}`,
                    cursor: 'pointer',
                    padding: 0,
                    outline: data?.colorName === c.name ? `2px solid ${c.color}` : 'none',
                    outlineOffset: '2px',
                    transition: 'transform 0.1s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              ))}
            </div>
          )}
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
