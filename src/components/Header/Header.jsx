import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { Icons } from '../Icons/Icons.jsx'
import { useBuilderStore } from '../../builder/state/useBuilderStore.js'
import { cn } from '../../utils/index.js'

const Header = ({ isDarkMode, toggleTheme, showBackButton = false, onBack }) => {
  const navigate = useNavigate()
  const { websiteId } = useParams()
  const [isPagesOpen, setIsPagesOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const {
    // State
    currentWebsite,
    currentPage,
    pages,
    isPreviewMode,
    activeView,
    canUndo,
    canRedo,
    status,
    lastSaved,
    isPublished,
    
    // Actions
    setCurrentPage,
    togglePreviewMode,
    setActiveView,
    undo,
    redo,
    saveDraft,
    publish,
    addPage,
  } = useBuilderStore()

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (!isPreviewMode) {
          saveDraft()
          toast.success('Draft saved')
        }
      }
      
      // Ctrl/Cmd + Z
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo && !isPreviewMode) {
          undo()
          toast('Undo')
        }
      }
      
      // Ctrl/Cmd + Shift + Z
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'z') {
        e.preventDefault()
        if (canRedo && !isPreviewMode) {
          redo()
          toast('Redo')
        }
      }
      
      // Escape key
      if (e.key === 'Escape') {
        setIsPagesOpen(false)
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [canUndo, canRedo, isPreviewMode, undo, redo, saveDraft])

  const handlePageChange = (pageId) => {
    setCurrentPage(pageId)
    setIsPagesOpen(false)
    toast.success(`Switched to ${pages.find(p => p.id === pageId)?.name}`)
  }

  const handleAddPage = () => {
    const newPage = addPage(`Page ${pages.length + 1}`)
    setCurrentPage(newPage.id)
    setIsPagesOpen(false)
    toast.success('New page added')
  }

  const handlePublish = () => {
    publish()
    toast.success(isPublished ? 'Website updated!' : 'Website published!')
  }

  const handleLivePreview = () => {
    window.open(`/preview/${currentWebsite?.id}`, '_blank')
    toast('Opening preview in new tab')
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'saving':
        return <Icons.Loader2 className="w-4 h-4 animate-spin-slow text-primary" />
      case 'published':
        return <Icons.CheckCircle className="w-4 h-4 text-green-500" />
      case 'unsaved':
        return <Icons.AlertCircle className="w-4 h-4 text-amber-500" />
      default:
        return <Icons.CheckCircle className="w-4 h-4 text-muted-foreground" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'saving':
        return 'Saving...'
      case 'published':
        return isPublished ? 'Published' : 'Published'
      case 'unsaved':
        return 'Unsaved changes'
      default:
        return lastSaved ? `Saved ${lastSaved}` : 'All changes saved'
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Back to dashboard"
              >
                <Icons.ChevronLeft className="w-5 h-5" />
              </button>
            )}
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                <Icons.LayoutGrid className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground hidden md:inline">
                WebsiteBuilder
              </span>
            </div>

            {/* Page Selector */}
            {currentWebsite && (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsPagesOpen(!isPagesOpen)}
                  disabled={isPreviewMode}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all",
                    isPreviewMode 
                      ? "bg-muted text-muted-foreground cursor-not-allowed"
                      : "hover:border-primary/50 hover:bg-accent"
                  )}
                >
                  <Icons.FileText className="w-4 h-4" />
                  <span className="font-medium">
                    {pages.find(p => p.id === currentPage)?.name || 'Select Page'}
                  </span>
                  <Icons.ChevronDown className="w-4 h-4 transition-transform" />
                </button>

                <AnimatePresence>
                  {isPagesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full mt-2 left-0 w-64 bg-background border border-border rounded-lg shadow-lg z-50"
                    >
                      <div className="p-2">
                        <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase">
                          Pages
                        </div>
                        
                        {pages.map((page) => (
                          <button
                            key={page.id}
                            onClick={() => handlePageChange(page.id)}
                            className={cn(
                              "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                              page.id === currentPage
                                ? "bg-primary/10 text-primary"
                                : "hover:bg-accent"
                            )}
                          >
                            <Icons.FileText className="w-4 h-4" />
                            <span className="flex-1 text-left">{page.name}</span>
                            {page.id === currentPage && (
                              <Icons.CheckCircle className="w-4 h-4 text-primary" />
                            )}
                          </button>
                        ))}

                        <div className="border-t border-border my-2" />

                        <button
                          onClick={handleAddPage}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
                        >
                          <Icons.Plus className="w-4 h-4" />
                          <span>Add New Page</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Center Section - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            {/* Undo/Redo */}
            <div className="flex items-center gap-1 bg-accent rounded-lg p-1">
              <button
                onClick={undo}
                disabled={!canUndo || isPreviewMode}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  canUndo && !isPreviewMode
                    ? "hover:bg-background"
                    : "cursor-not-allowed opacity-50"
                )}
                title="Undo (Ctrl+Z)"
              >
                <Icons.Undo className="w-4 h-4" />
              </button>
              
              <button
                onClick={redo}
                disabled={!canRedo || isPreviewMode}
                className={cn(
                  "p-2 rounded-md transition-colors",
                  canRedo && !isPreviewMode
                    ? "hover:bg-background"
                    : "cursor-not-allowed opacity-50"
                )}
                title="Redo (Ctrl+Shift+Z)"
              >
                <Icons.Redo className="w-4 h-4" />
              </button>
            </div>

            {/* Preview/Edit Toggle */}
            <div className="flex items-center bg-accent rounded-lg p-1">
              <button
                onClick={() => !isPreviewMode && togglePreviewMode()}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                  !isPreviewMode
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-background"
                )}
              >
                Edit
              </button>
              <button
                onClick={() => isPreviewMode && togglePreviewMode()}
                className={cn(
                  "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                  isPreviewMode
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-background"
                )}
              >
                Preview
              </button>
            </div>

            {/* View Switcher */}
            <div className="flex items-center gap-1 bg-accent rounded-lg p-1">
              {[
                { id: 'desktop', icon: Icons.Monitor, label: 'Desktop' },
                { id: 'tablet', icon: Icons.Tablet, label: 'Tablet' },
                { id: 'mobile', icon: Icons.Mobile, label: 'Mobile' }
              ].map((view) => (
                <button
                  key={view.id}
                  onClick={() => !isPreviewMode && setActiveView(view.id)}
                  disabled={isPreviewMode}
                  className={cn(
                    "p-2 rounded-md transition-colors",
                    activeView === view.id && !isPreviewMode
                      ? "bg-background text-primary"
                      : isPreviewMode
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-background"
                  )}
                  title={`${view.label} View`}
                >
                  <view.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-accent">
              {getStatusIcon()}
              <span className="text-sm font-medium">{getStatusText()}</span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 hover:bg-accent rounded-lg transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? (
                <Icons.Sun className="w-5 h-5" />
              ) : (
                <Icons.Moon className="w-5 h-5" />
              )}
            </button>

            {/* Live Preview */}
            <button
              onClick={handleLivePreview}
              disabled={!currentWebsite}
              className={cn(
                "hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                currentWebsite
                  ? "hover:border-primary/50 hover:bg-accent"
                  : "cursor-not-allowed opacity-50"
              )}
            >
              <Icons.Eye className="w-4 h-4" />
              <span className="text-sm font-medium">Preview</span>
            </button>

            {/* Save Draft */}
            <button
              onClick={saveDraft}
              disabled={isPreviewMode || status === 'saving'}
              className={cn(
                "hidden md:flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                isPreviewMode || status === 'saving'
                  ? "cursor-not-allowed opacity-50"
                  : "hover:border-primary/50 hover:bg-accent"
              )}
            >
              <Icons.Save className="w-4 h-4" />
              <span className="text-sm font-medium">Save</span>
            </button>

            {/* Publish Button */}
            <button
              onClick={handlePublish}
              disabled={isPreviewMode || status === 'saving'}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors font-medium",
                isPreviewMode || status === 'saving'
                  ? "bg-muted text-muted-foreground cursor-not-allowed"
                  : isPublished
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              )}
            >
              {isPublished ? (
                <>
                  <Icons.CloudUpload className="w-4 h-4" />
                  <span className="hidden sm:inline">Update</span>
                </>
              ) : (
                <>
                  <Icons.Cloud className="w-4 h-4" />
                  <span className="hidden sm:inline">Publish</span>
                </>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 hover:bg-accent rounded-lg"
            >
              {isMobileMenuOpen ? (
                <Icons.X className="w-5 h-5" />
              ) : (
                <Icons.Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background"
          >
            <div className="container mx-auto px-4 py-4">
              <div className="space-y-4">
                {/* Mobile Page Selector */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Pages</div>
                  <div className="space-y-1">
                    {pages.map((page) => (
                      <button
                        key={page.id}
                        onClick={() => {
                          handlePageChange(page.id)
                          setIsMobileMenuOpen(false)
                        }}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg",
                          page.id === currentPage
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-accent"
                        )}
                      >
                        <span>{page.name}</span>
                        {page.id === currentPage && (
                          <Icons.CheckCircle className="w-4 h-4" />
                        )}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={handleAddPage}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-dashed border-border hover:bg-accent"
                  >
                    <Icons.Plus className="w-4 h-4" />
                    Add Page
                  </button>
                </div>

                {/* Mobile Controls */}
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={undo}
                    disabled={!canUndo || isPreviewMode}
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2 rounded-lg border",
                      canUndo && !isPreviewMode
                        ? "hover:bg-accent"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Icons.Undo className="w-4 h-4" />
                    Undo
                  </button>
                  <button
                    onClick={redo}
                    disabled={!canRedo || isPreviewMode}
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2 rounded-lg border",
                      canRedo && !isPreviewMode
                        ? "hover:bg-accent"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Icons.Redo className="w-4 h-4" />
                    Redo
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'desktop', icon: Icons.Monitor, label: 'Desktop' },
                    { id: 'tablet', icon: Icons.Tablet, label: 'Tablet' },
                    { id: 'mobile', icon: Icons.Mobile, label: 'Mobile' }
                  ].map((view) => (
                    <button
                      key={view.id}
                      onClick={() => {
                        setActiveView(view.id)
                        setIsMobileMenuOpen(false)
                      }}
                      disabled={isPreviewMode}
                      className={cn(
                        "flex flex-col items-center gap-1 px-3 py-2 rounded-lg border",
                        activeView === view.id && !isPreviewMode
                          ? "bg-primary text-primary-foreground"
                          : isPreviewMode
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-accent"
                      )}
                    >
                      <view.icon className="w-4 h-4" />
                      <span className="text-xs">{view.label}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={saveDraft}
                    disabled={isPreviewMode || status === 'saving'}
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2 rounded-lg border",
                      isPreviewMode || status === 'saving'
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-accent"
                    )}
                  >
                    <Icons.Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleLivePreview}
                    disabled={!currentWebsite}
                    className={cn(
                      "flex items-center justify-center gap-2 px-3 py-2 rounded-lg border",
                      currentWebsite
                        ? "hover:bg-accent"
                        : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <Icons.Eye className="w-4 h-4" />
                    Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Header