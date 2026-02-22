import React, { PropsWithChildren } from 'react'
import clsx from 'clsx'
import Loader from './Loader'

type ButtonProps = {
  variant?: 'outlined'
  disabled?: boolean
  loading?: boolean
  className?: string
  onClick?: () => void
}

const Button: React.FC<ButtonProps & PropsWithChildren> = (props) => {
  const { variant, disabled, loading, children, className, onClick } = props

  return (
    <button
      className={clsx(
        'disabled:bg-disabled h-[48px] rounded-lg',
        variant === 'outlined'
          ? 'border-secondary text-secondary border bg-transparent'
          : 'bg-secondary text-white',
        className,
      )}
      disabled={disabled}
      onClick={loading ? undefined : onClick}
    >
      {loading ? <Loader className="mx-auto" /> : children}
    </button>
  )
}

export default Button
