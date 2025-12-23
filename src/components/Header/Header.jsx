import React, { useState, useRef, useEffect } from 'react'
import { Plus, Moon, Sun, User, Settings, LogOut } from 'lucide-react'

const DashboardHeader = ({
  isDarkMode,
  toggleTheme,
  onCreateWebsite,
}) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Left: Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            WB
          </div>
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Website Builder
          </span>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">

          {/* Create Website */}
          <button
            onClick={onCreateWebsite}
            className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Website
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            )}
          </button>

          {/* Profile */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold">
                U
              </div>
            </button>

            {/* Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                
                {/* User Info */}
                <div className="px-4 py-3 border-b dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    User Name
                  </p>
                  <p className="text-xs text-gray-500">
                    user@email.com
                  </p>
                </div>

                {/* Menu Items */}
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  <User className="w-4 h-4" />
                  Profile
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings className="w-4 h-4" />
                  Settings
                </button>

                <div className="border-t dark:border-gray-700" />

                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  )
}

export default DashboardHeader
