// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Editor from "./pages/Editor";

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/editor" element={<Editor />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard.jsx'
import Editor from './pages/Editor.jsx'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDarkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDarkMode])

  const toggleTheme = () => setIsDarkMode(!isDarkMode)

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/Dashboard" element={
            <Dashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          } />
          <Route path="/editor/:websiteId?" element={
            <Editor isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
          } />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        
        <Toaster
          position="bottom-right"
          toastOptions={{
            className: 'glass',
            duration: 3000,
          }}
        />
      </div>
    </Router>
  )
}

export default App