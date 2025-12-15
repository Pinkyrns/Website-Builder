// // src/builder/state/useBuilderStore.js
// import { useState } from "react";

// export const useBuilderStore = () => {
//   const [elements, setElements] = useState([
//     { id: "title", type: "text", tag: "h1", text: "Welcome to My Website", style: {} },
//     { id: "description", type: "text", tag: "p", text: "This is a customizable paragraph.", style: {} },
//     { id: "button1", type: "button", tag: "button", text: "Click Me", style: {} },
//   ]);

//   const [selectedId, setSelectedId] = useState(null);

//   const addElement = (type) => {
//     const id = `${type}-${Date.now()}`;
//     let newEl;

//     switch (type) {
//       case "text":
//         newEl = { id, type, tag: "p", text: "New Text", style: {} };
//         break;
//       case "button":
//         newEl = { id, type, tag: "button", text: "New Button", style: {} };
//         break;
//       case "image":
//         newEl = { id, type, tag: "img", src: "https://via.placeholder.com/150", style: { width: "150px", height: "150px" } };
//         break;
//       case "hero":
//         newEl = { id, type, tag: "div", text: "Hero Section", style: { padding: "50px", backgroundColor: "#eee", textAlign: "center" } };
//         break;
//       default:
//         newEl = { id, type, tag: "div", text: "New Div", style: {} };
//     }

//     setElements([...elements, newEl]);
//     setSelectedId(id);
//   };

//   const removeElement = (id) => {
//     setElements(elements.filter(el => el.id !== id));
//     if (selectedId === id) setSelectedId(null);
//   };

//   const updateElement = (id, newProps) => {
//     setElements(elements.map(el => (el.id === id ? { ...el, ...newProps } : el)));
//   };

//   return { elements, selectedId, setSelectedId, addElement, removeElement, updateElement };
// };
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useBuilderStore = create(
  persist(
    (set, get) => ({
      // Websites
      websites: [
        {
          id: '1',
          name: 'My Portfolio',
          template: 'portfolio',
          updatedAt: '2 hours ago',
          isPublished: true,
          pages: ['home', 'about', 'projects']
        },
        {
          id: '2',
          name: 'Business Website',
          template: 'business',
          updatedAt: '1 day ago',
          isPublished: false,
          pages: ['home', 'services', 'contact']
        }
      ],
      
      // Current Website
      currentWebsite: null,
      currentPage: 'home',
      
      // Pages for current website
      pages: [
        { id: 'home', name: 'Home', elements: [] },
        { id: 'about', name: 'About', elements: [] },
        { id: 'contact', name: 'Contact', elements: [] }
      ],
      
      // Editor State
      isPreviewMode: false,
      activeView: 'desktop',
      showCodeEditor: false,
      selectedElement: null,
      
      // History
      canUndo: false,
      canRedo: false,
      historyStack: [],
      redoStack: [],
      
      // Status
      status: 'saved', // saved, saving, published, unsaved
      lastSaved: null,
      isPublished: false,
      lastPublished: null,
      
      // Actions
      setCurrentWebsite: (websiteId) => {
        const website = get().websites.find(w => w.id === websiteId)
        set({ currentWebsite: website })
      },
      
      loadWebsite: (websiteId) => {
        const website = get().websites.find(w => w.id === websiteId)
        if (website) {
          set({ currentWebsite: website, currentPage: 'home' })
        }
        return website
      },
      
      createWebsite: (name, template = 'blank') => {
        const newWebsite = {
          id: Date.now().toString(),
          name,
          template,
          updatedAt: 'Just now',
          isPublished: false,
          pages: ['home']
        }
        
        set(state => ({
          websites: [...state.websites, newWebsite],
          currentWebsite: newWebsite
        }))
        
        return newWebsite
      },
      
      deleteWebsite: (websiteId) => {
        set(state => ({
          websites: state.websites.filter(w => w.id !== websiteId),
          currentWebsite: state.currentWebsite?.id === websiteId ? null : state.currentWebsite
        }))
      },
      
      duplicateWebsite: (websiteId) => {
        const website = get().websites.find(w => w.id === websiteId)
        if (website) {
          const duplicated = {
            ...website,
            id: Date.now().toString(),
            name: `${website.name} (Copy)`,
            updatedAt: 'Just now'
          }
          
          set(state => ({
            websites: [...state.websites, duplicated]
          }))
        }
      },
      
      setCurrentPage: (pageId) => {
        set({ currentPage: pageId })
      },
      
      addPage: (name) => {
        const newPage = {
          id: `page-${Date.now()}`,
          name,
          elements: []
        }
        
        set(state => ({
          pages: [...state.pages, newPage]
        }))
        
        return newPage
      },
      
      togglePreviewMode: () => {
        set(state => ({ isPreviewMode: !state.isPreviewMode }))
      },
      
      setActiveView: (view) => {
        const validViews = ['desktop', 'tablet', 'mobile']
        if (validViews.includes(view)) {
          set({ activeView: view })
        }
      },
      
      toggleCodeEditor: () => {
        set(state => ({ showCodeEditor: !state.showCodeEditor }))
      },
      
      undo: () => {
        const { historyStack, redoStack } = get()
        if (historyStack.length > 0) {
          const lastAction = historyStack[historyStack.length - 1]
          set({
            historyStack: historyStack.slice(0, -1),
            redoStack: [...redoStack, lastAction],
            canUndo: historyStack.length > 1,
            canRedo: true,
            status: 'unsaved'
          })
        }
      },
      
      redo: () => {
        const { historyStack, redoStack } = get()
        if (redoStack.length > 0) {
          const nextAction = redoStack[redoStack.length - 1]
          set({
            historyStack: [...historyStack, nextAction],
            redoStack: redoStack.slice(0, -1),
            canRedo: redoStack.length > 1,
            canUndo: true,
            status: 'unsaved'
          })
        }
      },
      
      saveDraft: () => {
        set({ status: 'saving' })
        
        // Simulate API call
        setTimeout(() => {
          set({
            status: 'saved',
            lastSaved: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          })
        }, 1000)
      },
      
      publish: () => {
        const { isPublished } = get()
        set({ status: 'saving' })
        
        // Simulate API call
        setTimeout(() => {
          set({
            status: 'published',
            isPublished: true,
            lastPublished: new Date().toLocaleString()
          })
        }, 1500)
      },
      
      recordAction: (action) => {
        set(state => ({
          historyStack: [...state.historyStack, action],
          canUndo: true,
          redoStack: [],
          canRedo: false,
          status: 'unsaved'
        }))
      }
    }),
    {
      name: 'builder-storage',
      partialize: (state) => ({
        websites: state.websites,
        currentWebsite: state.currentWebsite
      })
    }
  )
)