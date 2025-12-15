import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icons } from '../Icons/Icons.jsx'
import { cn } from '../../utils/index.js'
import toast from 'react-hot-toast'

const WebsiteCard = ({ website, onEdit, onDelete, onDuplicate }) => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleEdit = () => {
    onEdit?.(website.id)
    navigate(`/editor/${website.id}`)
  }

  const handleDelete = () => {
    onDelete?.(website.id)
    toast.success('Website deleted')
    setIsMenuOpen(false)
  }

  const handleDuplicate = () => {
    onDuplicate?.(website.id)
    toast.success('Website duplicated')
    setIsMenuOpen(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
    >
      {/* Thumbnail */}
      <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 relative overflow-hidden">
        {website.thumbnail ? (
          <img
            src={website.thumbnail}
            alt={website.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Icons.LayoutGrid className="w-12 h-12 text-primary/50" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {website.pages?.length || 0} pages
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleEdit}
                className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                title="Edit website"
              >
                <Icons.Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-foreground truncate">
              {website.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              Last edited {website.updatedAt}
            </p>
          </div>
          
          {/* Menu Button */}
          <div className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1 hover:bg-accent rounded-lg transition-colors"
            >
              <Icons.MoreVertical className="w-4 h-4" />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-background border border-border rounded-lg shadow-lg z-10">
                <button
                  onClick={handleEdit}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent text-left transition-colors rounded-t-lg"
                >
                  <Icons.Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
                
                <button
                  onClick={handleDuplicate}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-accent text-left transition-colors"
                >
                  <Icons.Copy className="w-4 h-4" />
                  <span>Duplicate</span>
                </button>
                
                <div className="border-t border-border" />
                
                <button
                  onClick={handleDelete}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-destructive/10 text-destructive text-left transition-colors rounded-b-lg"
                >
                  <Icons.Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-3">
          {website.isPublished && (
            <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-500/10 text-green-600 rounded">
              <Icons.Globe className="w-3 h-3" />
              Published
            </span>
          )}
          
          <span className="text-xs text-muted-foreground">
            {website.template || 'Custom'}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export default WebsiteCard