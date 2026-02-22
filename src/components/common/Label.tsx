import { PropsWithChildren } from 'react'
import clsx from 'clsx'

// eslint-disable-next-line react/prop-types
const Label: React.FC<PropsWithChildren<{ className?: string }>> = ({ children, className }) => {
  return <div className={clsx('text-lg font-semibold text-[#6E7491]', className)}>{children}</div>
}

export default Label
