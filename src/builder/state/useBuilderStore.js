// import { create } from 'zustand'
// import { persist } from 'zustand/middleware'
// import { gadgetStoreTemplate } from '../../gadgetStoreTemplate.js'

// export const useBuilderStore = create(
//   persist(
//     (set, get) => ({
//       websites: [],
//       currentWebsite: null,
//       currentPage: 'home',

//       pages: [
//         {
//           id: 'home',
//           name: 'Home',
//           html: '',
//           css: '',
//           js: ''
//         }
//       ],

//       selectedNode: null,
//       activeView: 'desktop',
//       isPreviewMode: false,
//       showCodeEditor: false,

//       /* ---------- WEBSITE CREATION (FIX) ---------- */

//       createWebsite: (name, templateId = 'gadget-store') => {
//         const website = {
//           id: Date.now().toString(),
//           name,
//           templateId,
//           createdAt: Date.now()
//         }

//         set(state => ({
//           websites: [...state.websites, website],
//           currentWebsite: website,
//           currentPage: 'home'
//         }))

//         return website
//       },

//       /* ---------- TEMPLATE LOAD ---------- */

//       loadGadgetTemplate: () => {
//         set(state => ({
//           pages: state.pages.map(p =>
//             p.id === state.currentPage
//               ? {
//                   ...p,
//                   html: gadgetStoreTemplate.html,
//                   css: gadgetStoreTemplate.css,
//                   js: gadgetStoreTemplate.js
//                 }
//               : p
//           )
//         }))
//       },

//       /* ---------- CORE ACTIONS ---------- */

//       loadWebsite: (id) => {
//         const site = get().websites.find(w => w.id === id)
//         if (!site) return null
//         set({ currentWebsite: site, currentPage: 'home' })
//         return site
//       },
// saveHtmlFromIframe: (html) => {
//   set(state => ({
//     pages: state.pages.map(p =>
//       p.id === state.currentPage
//         ? { ...p, html }
//         : p
//     )
//   }))
// }
// ,
// addElementToPage: (type) => {
//   set((state) => {
//     const page = state.pages.find(p => p.id === state.currentPage)
//     if (!page) return {}

//     let html = page.html || ''

//     if (type === 'text') {
//       html += `<p data-editable="true">New Text</p>`
//     }

//     if (type === 'heading') {
//       html += `<h2 data-editable="true">New Heading</h2>`
//     }

//     if (type === 'button') {
//       html += `<button data-editable="true">Click Me</button>`
//     }

//     if (type === 'image') {
//       html += `<img src="/templates/gadget-store/images/item1.png" style="max-width:200px;" />`
//     }

//     if (type === 'divider') {
//       html += `<hr />`
//     }

//     return {
//       pages: state.pages.map(p =>
//         p.id === state.currentPage ? { ...p, html } : p
//       )
//     }
//   })
// },

//       setCurrentPage: (id) => set({ currentPage: id }),
//       setSelectedNode: (node) => set({ selectedNode: node }),

//       updatePageCode: (type, value) => {
//         set(state => ({
//           pages: state.pages.map(p =>
//             p.id === state.currentPage
//               ? { ...p, [type]: value }
//               : p
//           )
//         }))
//       },

//       importTemplate: ({ html, css, js }) => {
//         set(state => ({
//           pages: state.pages.map(p =>
//             p.id === state.currentPage
//               ? { ...p, html, css, js }
//               : p
//           )
//         }))
//       },

//       toggleCodeEditor: () =>
//         set(state => ({ showCodeEditor: !state.showCodeEditor })),

//       setActiveView: (view) => set({ activeView: view }),
//     }),
//     {
//       name: 'builder-storage',
//       version: 3 // IMPORTANT
//     }
//   )
// )


import { create } from 'zustand'

export const useBuilderStore = create((set, get) => ({
  /* ================= GRAPESJS ================= */
  editor: null,
  setEditor: (editor) => set({ editor }),

  /* ================= CMS STATE ================= */
  websites: [],
  currentWebsite: null,

  currentPage: 'home',

  pages: [
    { id: 'home', name: 'Home', html: '', css: '', js: '' },
    { id: 'about', name: 'About', html: '', css: '', js: '' },
    { id: 'contact', name: 'Contact', html: '', css: '', js: '' },
  ],

  activeView: 'desktop',
  showCodeEditor: false,

  /* ================= WEBSITE ================= */
  createWebsite: (name) => {
    const website = {
      id: Date.now().toString(),
      name,
      createdAt: Date.now(),
    }

    set({
      websites: [...get().websites, website],
      currentWebsite: website,
      currentPage: 'home',
    })

    return website
  },

  loadWebsite: (id) => {
    const site = get().websites.find(w => w.id === id)
    if (!site) return null

    set({
      currentWebsite: site,
      currentPage: 'home',
    })

    return site
  },

  /* ================= PAGE ACTIONS ================= */

  saveFromEditor: () => {
    const editor = get().editor
    if (!editor) return

    const html = editor.getHtml()
    const css = editor.getCss()

    set(state => ({
      pages: state.pages.map(p =>
        p.id === state.currentPage
          ? { ...p, html, css }
          : p
      ),
    }))
  },

  setCurrentPage: (pageId) => {
    const editor = get().editor

    // 🔴 AUTO-SAVE CURRENT PAGE BEFORE SWITCH
    if (editor) {
      const html = editor.getHtml()
      const css = editor.getCss()

      set(state => ({
        pages: state.pages.map(p =>
          p.id === state.currentPage
            ? { ...p, html, css }
            : p
        ),
      }))
    }

    set({ currentPage: pageId })
  },

  addPage: (name) => {
    const id = name.toLowerCase().replace(/\s+/g, '-')

    set(state => ({
      pages: [
        ...state.pages,
        { id, name, html: '', css: '', js: '' },
      ],
    }))
  },

  importTemplate: ({ html, css, js }) => {
    set(state => ({
      pages: state.pages.map(p =>
        p.id === state.currentPage
          ? { ...p, html, css, js }
          : p
      ),
    }))
  },

  toggleCodeEditor: () =>
    set(state => ({ showCodeEditor: !state.showCodeEditor })),

  setActiveView: (view) => set({ activeView: view }),
}))
