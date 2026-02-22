import type { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import clsx from 'clsx'

export type SidebarProps = {
  open: boolean
  onClose: () => void
}

const MENU = [
  {
    path: '/',
    text: 'Home',
  },
]

const SidebarMenu: FC<SidebarProps> = ({ open, onClose }) => {
  const pathname = usePathname()

  return (
    <nav
      aria-hidden={!open}
      className={clsx([
        'fixed top-0 z-50 h-[100vh] w-[260px] bg-blue-50 p-4 py-2 shadow-md transition-[left] duration-500 ease-in-out',
        open ? 'left-0' : '-left-full',
      ])}
    >
      <IconButton onClick={onClose} data-testid="close-menu">
        <CloseIcon fontSize="large" />
      </IconButton>
      <div className="flex flex-col">
        {MENU.map((v) => (
          <Link
            key={v.path}
            className={clsx([
              'mt-4 rounded p-4 py-2 text-black no-underline',
              {
                'bg-blue-800 !text-white': v.path === pathname,
              },
            ])}
            href={v.path}
            onClick={onClose}
          >
            {v.text}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default SidebarMenu
