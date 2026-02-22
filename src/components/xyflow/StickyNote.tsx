'use client'
import { memo, useEffect, useState } from 'react'
import { Node, NodeProps, useReactFlow } from '@xyflow/react'

import tw from 'twin.macro'

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
}

export type DoubleClickedData = {
  doubleClicked?: boolean
}

export type StickyNode = Node<StickyNodeData & DoubleClickedData, 'sticky-note'>

export type StickyNodeProps = NodeProps<StickyNode>

export const nodeColor = '#FFFACE' // yellowish color

export function StickyNode(props: StickyNodeProps) {
  const { id, data, selected } = props

  const { updateNodeData } = useReactFlow()

  const [label, setLabel] = useState(data?.label ?? '')
  const [editing, setEditing] = useState(false)
  const [borderColor, setBorderColor] = useState('rgb(255,235,59)')
  const [backgroundColor, setBackgroundColor] = useState('rgb(255,250,206)')

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

  return (
    <MainDiv
      id={id}
      className="nowheel"
      css={[
        `border: 2px solid ${selected ? borderColor : defaultBorderColor};`, // border color
        `background-color: ${backgroundColor};`, // background color
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
  )
}

export default memo(StickyNode) as typeof StickyNode
