import React from 'react'
import { Icons } from '../Icons/Icons.jsx'
import { cn } from '../../utils/index.js'

const ThemeToggle = ({ isDarkMode, onToggle, className }) => {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
        isDarkMode ? "bg-primary" : "bg-muted",
        className
      )}
      aria-label="Toggle theme"
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-background transition-transform",
          isDarkMode ? "translate-x-6" : "translate-x-1"
        )}
      >
        {isDarkMode ? (
          <Icons.Moon className="h-3 w-3 text-primary absolute inset-0 m-auto" />
        ) : (
          <Icons.Sun className="h-3 w-3 text-amber-500 absolute inset-0 m-auto" />
        )}
      </span>
    </button>
  )
}

export default ThemeToggle