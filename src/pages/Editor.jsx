// // src/pages/Editor.jsx
// import { gadgetStoreTemplate } from '../gadgetStoreTemplate.js'
// import React, { useEffect, useState } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels'
// import { Header, Sidebar, Canvas, Inspector, CodeEditor } from '../components/index.js'
// import { useBuilderStore } from '../builder/state/useBuilderStore.js'

// const Editor = ({ isDarkMode, toggleTheme }) => {
//   const { websiteId } = useParams()
//   const navigate = useNavigate()
//   const [isLoading, setIsLoading] = useState(true)
//   const [isMobile, setIsMobile] = useState(false)
  
//   const {
//     currentWebsite,
//     currentPage,
//     pages,
//     importTemplate,
//     isPreviewMode,
//     activeView,
//     showCodeEditor,
    
//     loadWebsite,
//     setCurrentPage,
//     toggleCodeEditor,
//     setActiveView,
    
//   } = useBuilderStore()

//   // Load website on mount
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (websiteId) {
//         const website = loadWebsite(websiteId)
//         if (!website) {
//           navigate('/dashboard')
//         }
//       } else {
//         navigate('/dashboard')
//       }
//       setIsLoading(false)
//     }, 500)

//     return () => clearTimeout(timer)
//   }, [websiteId])

// useEffect(() => {
//   const page = pages.find(p => p.id === currentPage)

//   // Load template ONLY once (first time)
//   if (page && !page.html) {
//     importTemplate({
//       html: gadgetStoreTemplate.html,
//       css: gadgetStoreTemplate.css,
//       js: gadgetStoreTemplate.js
//     })
//   }
// }, [currentPage])




//   // Handle mobile view
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768)
//     }
    
//     handleResize() // Initial check
//     window.addEventListener('resize', handleResize)
//     return () => window.removeEventListener('resize', handleResize)
//   }, [])

//   // Handle back to dashboard
//   const handleBackToDashboard = () => {
//     navigate('/dashboard')
//   }

//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-background">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
//           <h2 className="text-xl font-semibold text-foreground mb-2">
//             Loading Editor
//           </h2>
//           <p className="text-muted-foreground">
//             Preparing your workspace...
//           </p>
//         </div>
//       </div>
//     )
//   }

//   if (!currentWebsite) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-background">
//         <div className="text-center max-w-md p-8">
//           <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
//             <span className="text-3xl">⚠️</span>
//           </div>
//           <h2 className="text-2xl font-bold text-foreground mb-3">
//             Website Not Found
//           </h2>
//           <p className="text-muted-foreground mb-6">
//             The website you're trying to edit doesn't exist.
//           </p>
//           <button
//             onClick={() => navigate('/dashboard')}
//             className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-background">
//       {/* Header */}
//       <Header 
//         isDarkMode={isDarkMode} 
//         toggleTheme={toggleTheme}
//         showBackButton={true}
//         onBack={handleBackToDashboard}
//       />

//       {/* Mobile View */}
//       {isMobile ? (
//         <div className="flex-1 p-4">
//           <div className="bg-card border border-border rounded-xl p-4 mb-4">
//             <div className="flex items-center justify-between mb-4">
//               <div>
//                 <h2 className="font-semibold text-foreground">
//                   {currentWebsite.name}
//                 </h2>
//                 <p className="text-sm text-muted-foreground">
//                   Editing in {activeView} view
//                 </p>
//               </div>
//               <button
//                 onClick={() => setActiveView(activeView === 'mobile' ? 'desktop' : 'mobile')}
//                 className="p-2 hover:bg-accent rounded-lg"
//               >
//                 {activeView === 'mobile' ? '🖥️' : '📱'}
//               </button>
//             </div>
            
//             <div className="h-64 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg flex items-center justify-center mb-4">
//               <span className="text-4xl">🏗️</span>
//             </div>
            
//             <div className="space-y-4">
//               <button
//                 onClick={toggleCodeEditor}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
//               >
//                 <span className="text-lg">💻</span>
//                 <span>Open Code Editor</span>
//               </button>
              
//               <button
//                 onClick={() => setActiveView('tablet')}
//                 className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg hover:bg-accent transition-colors"
//               >
//                 <span className="text-lg">📱</span>
//                 <span>Switch to Tablet View</span>
//               </button>
//             </div>
//           </div>
          
//           <div className="text-center text-sm text-muted-foreground">
//             <p>Full editor experience available on desktop.</p>
//             <button
//               onClick={() => navigate('/dashboard')}
//               className="mt-4 text-primary hover:underline"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       ) : (
//         /* Desktop Editor Layout with Sidebar */
//         <div className="flex-1 overflow-hidden">
//           <PanelGroup direction="horizontal" className="h-full">
//             {/* Left Sidebar - Dynamic Elements */}
//             <Panel defaultSize={20} minSize={15} maxSize={30}>
//               <Sidebar />
//             </Panel>

//             <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors cursor-col-resize" />

//             {/* Main Canvas Area */}
//             <Panel defaultSize={60}>
//               <PanelGroup direction="vertical">
//                 {/* Canvas Header */}
//                 <Panel defaultSize={95} minSize={80}>
//                   <Canvas />
//                 </Panel>

//                 {/* Code Editor (Collapsible) */}
//                 {showCodeEditor && (
//                   <>
//                     <PanelResizeHandle className="h-1 bg-border hover:bg-primary transition-colors cursor-row-resize" />
//                     <Panel defaultSize={40} minSize={20} maxSize={60}>
//                       <CodeEditor />
//                     </Panel>
//                   </>
//                 )}
//               </PanelGroup>
//             </Panel>

//             <PanelResizeHandle className="w-1 bg-border hover:bg-primary transition-colors cursor-col-resize" />

//             {/* Right Sidebar - Inspector */}
//             <Panel defaultSize={20} minSize={15} maxSize={30}>
//               <Inspector />
//             </Panel>
//           </PanelGroup>
//         </div>
//       )}

//       {/* Floating Actions for Mobile */}
//       {isMobile && (
//         <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
//           <button
//             onClick={toggleCodeEditor}
//             className={`p-3 rounded-full shadow-lg transition-all ${
//               showCodeEditor
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-background text-foreground border border-border"
//             }`}
//           >
//             💻
//           </button>
          
//           <button
//             onClick={() => setActiveView('mobile')}
//             className={`p-3 rounded-full shadow-lg transition-all ${
//               activeView === 'mobile'
//                 ? "bg-primary text-primary-foreground"
//                 : "bg-background text-foreground border border-border"
//             }`}
//           >
//             📱
//           </button>
//         </div>
//       )}

//       {/* View Mode Indicator */}
//       {!isPreviewMode && (
//         <div className="fixed bottom-4 left-4 z-40">
//           <div className="px-4 py-2 rounded-lg bg-background/80 backdrop-blur border border-border flex items-center gap-3">
//             <div className="flex items-center gap-2">
//               {activeView === 'desktop' && '🖥️'}
//               {activeView === 'tablet' && '📱'}
//               {activeView === 'mobile' && '📱'}
//               <span className="text-sm font-medium capitalize">{activeView} View</span>
//             </div>
            
//             <div className="w-px h-4 bg-border" />
            
//             <div className="flex items-center gap-1">
//               {['desktop', 'tablet', 'mobile'].map((view) => (
//                 <button
//                   key={view}
//                   onClick={() => setActiveView(view)}
//                   className={`p-1.5 rounded transition-colors ${
//                     activeView === view
//                       ? "bg-primary text-primary-foreground"
//                       : "hover:bg-accent"
//                   }`}
//                   title={`Switch to ${view} view`}
//                 >
//                   {view === 'desktop' && '🖥️'}
//                   {view === 'tablet' && '📱'}
//                   {view === 'mobile' && '📱'}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Page Navigation */}
//       {pages.length > 1 && (
//         <div className="fixed bottom-4 right-4 z-40">
//           <div className="bg-background border border-border rounded-lg p-2 shadow-lg">
//             <div className="flex items-center gap-2">
//               <span className="text-sm font-medium text-foreground">
//                 Pages:
//               </span>
//               <select
//                 value={currentPage}
//                 onChange={(e) => setCurrentPage(e.target.value)}
//                 className="bg-transparent border-none focus:outline-none text-sm"
//               >
//                 {pages.map((page) => (
//                   <option key={page.id} value={page.id}>
//                     {page.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Editor


import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { gadgetStoreTemplate } from '../gadgetStoreTemplate.js'

import Header from '../builder/components/Header.jsx'
import Sidebar from '../builder/components/Sidebar.jsx'
import Canvas from '../builder/components/Canvas.jsx'
import Inspector from '../builder/components/Inspector.jsx'
import CodeEditor from '../builder/components/CodeEditor.jsx'

import { useBuilderStore } from '../builder/state/useBuilderStore.js'

const Editor = ({ isDarkMode, toggleTheme }) => {
  const { websiteId } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  const {
    currentWebsite,
    currentPage,
    pages,
    showCodeEditor,

    loadWebsite,
    importTemplate,
    toggleCodeEditor,
  } = useBuilderStore()

  /* ---------------- LOAD WEBSITE ---------------- */

  useEffect(() => {
    if (!websiteId) {
      navigate('/dashboard')
      return
    }

    const site = loadWebsite(websiteId)
    if (!site) {
      navigate('/dashboard')
      return
    }

    setLoading(false)
  }, [websiteId])

  /* ---------------- LOAD TEMPLATE (FIX IMAGE PATHS) ---------------- */

  useEffect(() => {
    const page = pages.find(p => p.id === currentPage)

    if (page && !page.html) {
      // 🔥 AUTO-FIX IMAGE PATHS HERE
      const fixedHtml = gadgetStoreTemplate.html
        .replaceAll('src="images/', 'src="/templates/gadget-store/images/')
       .replaceAll("src='images/", "src='/templates/gadget-store/images/")
       .replaceAll('src="./images/', 'src="/templates/gadget-store/images/')


      importTemplate({
        html: fixedHtml,
        css: gadgetStoreTemplate.css,
        js: gadgetStoreTemplate.js,
      })
    }
  }, [currentPage])

  /* ---------------- LOADING STATE ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading editor...
      </div>
    )
  }

  if (!currentWebsite) {
    return null
  }

  /* ---------------- RENDER ---------------- */

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />

      {/* Editor Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r bg-white overflow-y-auto">
          <Sidebar />
        </div>

        {/* Canvas + Code Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1">
            <Canvas />
          </div>

          {showCodeEditor && (
            <div className="h-64 border-t">
              <CodeEditor />
            </div>
          )}
        </div>

        {/* Inspector */}
        <div className="w-72 border-l bg-white overflow-y-auto">
          <Inspector />
        </div>
      </div>
    </div>
  )
}

export default Editor
