// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import Header from '../components/Header/Header.jsx'
// import { useBuilderStore } from '../builder/state/useBuilderStore.js'

// const Dashboard = ({ isDarkMode, toggleTheme }) => {
//   const navigate = useNavigate()

//   const {
//     websites,
//     createWebsite,
//   } = useBuilderStore()

//   const [showCreateModal, setShowCreateModal] = useState(false)
//   const [websiteName, setWebsiteName] = useState('')

//   const handleCreateWebsite = () => {
//     if (!websiteName.trim()) return

//     const website = createWebsite(websiteName)

//     setShowCreateModal(false)
//     setWebsiteName('')
//     navigate(`/editor/${website.id}`)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

//       <main className="container mx-auto px-4 py-8">
//         {/* Title */}
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Your Websites
//           </h1>
//           <p className="text-gray-600 mt-2">
//             Create and manage your websites
//           </p>
//         </div>

//         {/* Top Actions */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-xl font-semibold text-gray-900">
//             {websites.length} Website{websites.length !== 1 ? 's' : ''}
//           </h2>

//           <button
//             onClick={() => setShowCreateModal(true)}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
//           >
//             + New Website
//           </button>
//         </div>

//         {/* Website Grid */}
//         {websites.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
//             <h3 className="text-xl font-semibold text-gray-900 mb-2">
//               No websites yet
//             </h3>
//             <p className="text-gray-600 mb-6">
//               Get started by creating your first website
//             </p>
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//             >
//               Create Website
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {websites.map((website) => (
//               <div
//                 key={website.id}
//                 className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col"
//               >
//                 <h3 className="font-semibold text-gray-900 truncate mb-2">
//                   {website.name}
//                 </h3>

//                 <p className="text-sm text-gray-500 flex-1">
//                   Created on {new Date(website.createdAt).toLocaleDateString()}
//                 </p>

//                 <button
//                   onClick={() => navigate(`/editor/${website.id}`)}
//                   className="mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Open Editor
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* CREATE WEBSITE MODAL */}
//         {showCreateModal && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//             <div className="bg-white rounded-xl p-6 w-full max-w-md">
//               <h3 className="text-lg font-semibold mb-4">
//                 Create New Website
//               </h3>

//               <input
//                 value={websiteName}
//                 onChange={(e) => setWebsiteName(e.target.value)}
//                 placeholder="My Gadget Store"
//                 className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 autoFocus
//               />

//               <div className="flex gap-3 mt-6">
//                 <button
//                   onClick={() => setShowCreateModal(false)}
//                   className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
//                 >
//                   Cancel
//                 </button>

//                 <button
//                   onClick={handleCreateWebsite}
//                   className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
//                 >
//                   Create
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   )
// }

// export default Dashboard
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plus,
  LayoutGrid,
  FileText,
  Rocket
} from 'lucide-react'

import Header from '../components/Header/Header.jsx'
import { useBuilderStore } from '../builder/state/useBuilderStore.js'

const Dashboard = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate()
  const { websites, createWebsite } = useBuilderStore()

  const [showModal, setShowModal] = useState(false)
  const [websiteName, setWebsiteName] = useState('')

  const handleCreateWebsite = () => {
    if (!websiteName.trim()) return
    const site = createWebsite(websiteName)
    setWebsiteName('')
    setShowModal(false)
    navigate(`/editor/${site.id}`)
  }
  const handleUseTemplate = (templateName) => {
  const site = createWebsite(templateName)
  navigate(`/editor/${site.id}`)
}


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top App Header */}
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Dashboard Title */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Overview of your websites
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Websites"
            value={websites.length}
            icon={LayoutGrid}
          />
          <StatCard
            title="Draft Websites"
            value={websites.length}
            icon={FileText}
          />
          <StatCard
            title="Published"
            value={0}
            icon={Rocket}
          />
        </div>

        {/* Websites Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Your Websites
          </h2>

          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            New Website
          </button>
        </div>

        {/* Websites Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

  {/* ===== STATIC WEBSITE 1 ===== */}
<div className="bg-white rounded-xl border p-6 hover:shadow transition-shadow">
    <h3 className="font-semibold text-lg text-gray-900">
      Gadget Store 
    </h3>
    <p className="text-sm text-gray-500 mt-1">
    Gadget
    </p>
    <button
  onClick={() => handleUseTemplate('Portfolio Website')}
  className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg"
>
  Select
</button>

  </div>

  {/* ===== STATIC WEBSITE 2 ===== */}
  <div className="bg-white rounded-xl border p-6 hover:shadow transition-shadow">
    <h3 className="font-semibold text-lg text-gray-900">
      Fashion
    </h3>
    <p className="text-sm text-gray-500 mt-1">
      Fashion
    </p>
    <button
  onClick={() => handleUseTemplate('Portfolio Website')}
  className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg"
>
  Select
</button>

  </div>

  {/* ===== DYNAMIC WEBSITES (UNCHANGED) ===== */}
  {websites.map(site => (
    <div
      key={site.id}
      className="bg-white rounded-xl border p-6 hover:shadow transition-shadow"
    >
      <h3 className="font-semibold text-lg text-gray-900 truncate">
        {site.name}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Created on {new Date(site.createdAt).toLocaleDateString()}
      </p>

      <button
        onClick={() => navigate(`/editor/${site.id}`)}
        className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg"
      >
        Open Editor
      </button>
    </div>
  ))}
</div>

      </main>

      {/* Create Website Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Create New Website
            </h3>

            <input
              value={websiteName}
              onChange={(e) => setWebsiteName(e.target.value)}
              placeholder="My Website"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              autoFocus
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateWebsite}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const StatCard = ({ title, value, icon: Icon }) => (
  <div className="bg-white border rounded-xl p-6 flex items-center gap-4">
    <div className="p-3 bg-blue-100 rounded-lg">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
)

export default Dashboard
