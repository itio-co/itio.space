import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'
import { ICONS } from '@/constants/Icons'

type LoaderProps = {
  className?: string
}

const Loader: React.FC<LoaderProps> = (props) => {
  const { className } = props

  return (
    <Image
      src={ICONS.loaderIcon}
      width={28}
      height={28}
      className={clsx('animate-spin-slow h-[28px] w-[28px]', className)}
      alt="loader"
    />
  )
}

export default Loader
