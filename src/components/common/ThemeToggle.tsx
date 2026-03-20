'use client'
import React from 'react'
import { useTheme } from './ThemeProvider'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'

interface ThemeToggleProps {
  className?: string
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className={`
        inline-flex items-center justify-center
        w-9 h-9 rounded-full
        border border-white/10 dark:border-white/10
        bg-white/5 dark:bg-white/5
        hover:bg-white/10 dark:hover:bg-white/10
        text-gray-600 dark:text-gray-300
        transition-all duration-300
        cursor-pointer
        ${className}
      `}
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}
    >
      {theme === 'dark' ? (
        <HiOutlineSun className="w-[18px] h-[18px]" />
      ) : (
        <HiOutlineMoon className="w-[18px] h-[18px]" />
      )}
    </button>
  )
}

export default ThemeToggle
