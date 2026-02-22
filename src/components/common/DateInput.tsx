import React from 'react'
import clsx from 'clsx'

type DateInputProps = {
  value?: string
  disabled?: boolean
  className?: string
  onChangeDate: (text: string) => void
}

const DateInput: React.FC<DateInputProps> = (props) => {
  const { value, disabled, className, onChangeDate } = props

  return (
    <div
      className={clsx(
        'border-outline w-full rounded-lg border px-4 py-2',
        disabled ? 'bg-disabled' : 'bg-white',
        className,
      )}
    >
      <input
        value={value}
        disabled={disabled}
        type={'date'}
        placeholder=""
        className="disabled:bg-disabled w-full bg-white focus:outline-none"
        onChange={(e) => onChangeDate(e.target.value)}
      />
    </div>
  )
}

export default DateInput
