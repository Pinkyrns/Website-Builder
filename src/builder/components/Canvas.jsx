// import { useEffect, useRef, useState } from 'react'
// import grapesjs from 'grapesjs'
// import 'grapesjs/dist/css/grapes.min.css'
// import { useBuilderStore } from '../state/useBuilderStore'

// const TEMPLATE_BASE = '/templates/gadget-store/'

// const Canvas = () => {
//   const editorRef = useRef(null)
//   const containerRef = useRef(null)

//   const {
//     pages,
//     currentPage,
//     activeView,
//     setEditor,
//     saveFromEditor,
//   } = useBuilderStore()

//   const [zoom, setZoomState] = useState(100)

//   const viewportSizes = {
//     desktop: { width: '100%' },
//     tablet: { width: '768px' },
//     mobile: { width: '375px' },
//   }

//   const page = pages.find(p => p.id === currentPage)

//   /* ================= INIT GRAPES ================= */
//   useEffect(() => {
//     if (editorRef.current) return

//     const editor = grapesjs.init({
//       container: containerRef.current,
//       height: '100%',
//       width: 'auto',
//       storageManager: false,

//       canvas: {
//         styles: [
//           `${TEMPLATE_BASE}css/style.css`,
//           `${TEMPLATE_BASE}css/bootstrap.min.css`,
//           `${TEMPLATE_BASE}css/styles.css`,
//           `${TEMPLATE_BASE}css/swiper-bundle.min.css`,
//           `${TEMPLATE_BASE}css/font-awesome.min.css`,
//           `${TEMPLATE_BASE}css/animate.css`,
//           `${TEMPLATE_BASE}css/fonts.css`,
//           `${TEMPLATE_BASE}css/font-icons.css`,
//         ],
//         scripts: [
//           `${TEMPLATE_BASE}js/jquery.min.js`,
//           `${TEMPLATE_BASE}js/bootstrap.min.js`,
//           `${TEMPLATE_BASE}js/swiper-bundle.min.js`,
//           `${TEMPLATE_BASE}js/wow.min.js`,
//           `${TEMPLATE_BASE}js/carousel.js`,
//           `${TEMPLATE_BASE}js/bootstrap-select.min.js`,
//           `${TEMPLATE_BASE}js/count-down.js`,
//           `${TEMPLATE_BASE}js/multiple-modal.js`,
//           `${TEMPLATE_BASE}js/main.js`,
//         ],
//       },
//     })

//     editor.on('load', () => {
//       const iframe = editor.Canvas.getFrameEl()
//       const doc = iframe?.contentDocument
//       if (!doc) return

//       /* ✅ BASE TAG */
//       let base = doc.querySelector('base')
//       if (!base) {
//         base = doc.createElement('base')
//         base.href = TEMPLATE_BASE
//         doc.head.prepend(base)
//       }

//       /* ✅ FORCE SCROLL */
//       const style = doc.createElement('style')
//       style.innerHTML = `
//         html, body {
//           height: auto !important;
//           min-height: 100% !important;
//           overflow-y: auto !important;
//           overflow-x: hidden !important;
//         }
//       `
//       doc.head.appendChild(style)

//       /* ✅ FIX IMAGE PATHS */
//       doc.querySelectorAll('img').forEach(img => {
//         const src = img.getAttribute('src')
//         if (!src) return
//         if (src.startsWith('http') || src.startsWith('data:')) return
//         if (src.startsWith(TEMPLATE_BASE)) return

//         const clean = src.startsWith('/') ? src.slice(1) : src
//         img.src = TEMPLATE_BASE + clean
//       })
//     })

    

//     editorRef.current = editor
//     setEditor(editor)
//   }, [])

//   /* ================= LOAD PAGE ================= */
//   useEffect(() => {
//     if (!editorRef.current || !page) return
//     editorRef.current.setComponents(page.html || '')
//     editorRef.current.setStyle(page.css || '')
//   }, [currentPage])

//   /* ================= VIEWPORT ================= */
//   useEffect(() => {
//     if (!editorRef.current) return
//     const devices = {
//       desktop: 'Desktop',
//       tablet: 'Tablet',
//       mobile: 'Mobile portrait',
//     }
//     editorRef.current.setDevice(devices[activeView])
//   }, [activeView])

//   /* ================= ZOOM (CORRECT WAY) ================= */
//   const applyZoom = (value) => {
//     editorRef.current?.Canvas.setZoom(value)
//     setZoomState(value)
//   }

//   const zoomIn = () => applyZoom(Math.min(200, zoom + 10))
//   const zoomOut = () => applyZoom(Math.max(50, zoom - 10))
//   const resetZoom = () => applyZoom(100)

//   return (
//     <div className="h-full flex flex-col bg-gray-50">

//       {/* Toolbar */}
//       <div className="flex justify-between items-center px-4 py-2 bg-white border-b">
//         <div className="flex gap-2">
//           <button onClick={zoomOut}>−</button>
//           <button onClick={resetZoom}>{zoom}%</button>
//           <button onClick={zoomIn}>+</button>
//         </div>

//         <button
//           onClick={saveFromEditor}
//           className="px-4 py-1 bg-black text-white rounded"
//         >
//           Save
//         </button>
//       </div>

//       {/* ✅ SCROLLABLE CANVAS */}
//       <div className="flex-1 overflow-auto flex justify-center">
//         <div
//           style={{
//             width: viewportSizes[activeView].width,
//             minHeight: '100%',
//           }}
//           className="bg-white shadow"
//         >
//           <div ref={containerRef} className="min-h-screen" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Canvas


import { useEffect, useRef, useState } from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import { useBuilderStore } from '../state/useBuilderStore'

const TEMPLATE_BASE = '/templates/gadget-store/'

const Canvas = () => {
  const editorRef = useRef(null)
  const containerRef = useRef(null)

  const {
    pages,
    currentPage,
    activeView,
    setEditor,
    saveFromEditor,
  } = useBuilderStore()

  const [zoom, setZoom] = useState(100)

  const page = pages.find(p => p.id === currentPage)

  /* ================= INIT GRAPESJS ================= */
  useEffect(() => {
    if (editorRef.current) return

    const editor = grapesjs.init({
      container: containerRef.current,
      height: '100%',
      width: 'auto',
      storageManager: false,

      canvas: {
        styles: [
          `${TEMPLATE_BASE}css/style.css`,
          `${TEMPLATE_BASE}css/bootstrap.min.css`,
          `${TEMPLATE_BASE}css/styles.css`,
          `${TEMPLATE_BASE}css/swiper-bundle.min.css`,
          `${TEMPLATE_BASE}css/font-awesome.min.css`,
          `${TEMPLATE_BASE}css/animate.css`,
          `${TEMPLATE_BASE}css/fonts.css`,
          `${TEMPLATE_BASE}css/font-icons.css`,
        ],
        scripts: [
          `${TEMPLATE_BASE}js/jquery.min.js`,
          `${TEMPLATE_BASE}js/bootstrap.min.js`,
          `${TEMPLATE_BASE}js/swiper-bundle.min.js`,
          `${TEMPLATE_BASE}js/wow.min.js`,
          `${TEMPLATE_BASE}js/carousel.js`,
          `${TEMPLATE_BASE}js/bootstrap-select.min.js`,
          `${TEMPLATE_BASE}js/count-down.js`,
          `${TEMPLATE_BASE}js/multiple-modal.js`,
          `${TEMPLATE_BASE}js/main.js`,
        ],
      },
    })

    /* ================= AFTER IFRAME LOAD ================= */
    editor.on('load', () => {
      const iframe = editor.Canvas.getFrameEl()
      const doc = iframe?.contentDocument
      if (!doc) return

      /* ✅ BASE TAG (FIX ALL ASSETS) */
      let base = doc.querySelector('base')
      if (!base) {
        base = doc.createElement('base')
        base.href = TEMPLATE_BASE
        doc.head.prepend(base)
      }

      /* ✅ FORCE SCROLL */
      const style = doc.createElement('style')
      style.innerHTML = `
        html, body {
          height: auto !important;
          min-height: 100% !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
        }
      `
      doc.head.appendChild(style)
    })

    editorRef.current = editor
    setEditor(editor)
  }, [])

  /* ================= LOAD PAGE CONTENT ================= */
  useEffect(() => {
    if (!editorRef.current || !page) return

    editorRef.current.setComponents(page.html || '')
    editorRef.current.setStyle(page.css || '')
  }, [currentPage, pages])

  /* ================= VIEWPORT ================= */
  useEffect(() => {
    if (!editorRef.current) return

    const devices = {
      desktop: 'Desktop',
      tablet: 'Tablet',
      mobile: 'Mobile portrait',
    }

    editorRef.current.setDevice(devices[activeView])
  }, [activeView])

  /* ================= ZOOM ================= */
  const applyZoom = (value) => {
    editorRef.current?.Canvas.setZoom(value)
    setZoom(value)
  }

  const zoomIn = () => applyZoom(Math.min(200, zoom + 10))
  const zoomOut = () => applyZoom(Math.max(50, zoom - 10))
  const resetZoom = () => applyZoom(100)

  return (
    <div className="h-full flex flex-col bg-gray-50">

      {/* Toolbar */}
      <div className="flex justify-between items-center px-4 py-2 bg-white border-b">
        <div className="flex gap-2">
          <button onClick={zoomOut}>−</button>
          <button onClick={resetZoom}>{zoom}%</button>
          <button onClick={zoomIn}>+</button>
        </div>

        <button
          onClick={saveFromEditor}
          className="px-4 py-1 bg-black text-white rounded"
        >
          Save
        </button>
      </div>

      {/* ✅ SCROLLABLE CANVAS */}
      <div className="flex-1 overflow-auto flex justify-center">
        <div
          style={{
            width: activeView === 'desktop' ? '100%' :
                   activeView === 'tablet' ? '768px' : '375px',
            minHeight: '100%',
          }}
          className="bg-white shadow"
        >
          <div ref={containerRef} className="min-h-screen" />
        </div>
      </div>
    </div>
  )
}

export default Canvas
