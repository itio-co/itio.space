import React from 'react'
import clsx from 'clsx'

type TextInputProps = {
  label?: string
  value?: string
  placeholder?: string
  disabled?: boolean
  className?: string
  onChangeText: (text: string) => void
}

const TextInput: React.FC<TextInputProps> = (props) => {
  const { label, disabled, className, onChangeText, ...rest } = props

  return (
    <div className={className}>
      {label && <div className="mb-1 text-sm font-medium text-[#6E7491]">{label}</div>}
      <div
        className={clsx(
          'border-outline w-full rounded-lg border px-4 py-2',
          disabled ? 'bg-disabled' : 'bg-white',
        )}
      >
        <input
          disabled={disabled}
          className="disabled:bg-disabled w-full bg-white focus:outline-none"
          onChange={(e) => onChangeText(e.target.value)}
          {...rest}
        />
      </div>
    </div>
  )
}

export default TextInput
