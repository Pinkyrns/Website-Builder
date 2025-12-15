// src/utils/index.js
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Utility function to merge Tailwind classes
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

// Debounce function
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function
export const throttle = (func, limit) => {
  let inThrottle
  return function() {
    const args = arguments
    const context = this
    if (!inThrottle) {
      func.apply(context, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Generate unique ID
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Format date
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

// Capitalize string
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Check if running on mobile
export const isMobile = () => {
  return window.innerWidth < 768
}

// Simple storage helper
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch {
      return null
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Storage error:', error)
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Storage error:', error)
    }
  }
}

// Empty object for fallback
export const emptyObj = {}

// Simple promise delay
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))