import React from 'react'
import { MenuItem, Select } from '@mui/material'
import clsx from 'clsx'

type DropdownOption = {
  label: string
  value: never
}

type DropdownProps = {
  value?: never
  disabled?: boolean
  options: DropdownOption[]
  className?: string
  onChange: (value: number) => void
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const { value, disabled, options, className, onChange } = props

  return (
    <Select
      value={value}
      disabled={disabled}
      fullWidth
      className={clsx('!focus:outline-none h-[42px] outline-none', className)}
      onChange={(e) => onChange(+(e.target.value ?? 0))}
      variant={'standard'}>
      {options.map((option) => (
        <MenuItem key={`_dropdown_option_${option.value}`} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  )
}

export default Dropdown
