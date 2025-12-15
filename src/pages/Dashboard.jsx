
// import Sidebar from "../builder/components/SidebarD";
// import Topbar from "../builder/components/Topbar";
// import WebsiteCard from "../builder/components/WebsiteCard";

// export default function Dashboard() {
//   return (
//     <div className="flex bg-gray-50 min-h-screen">
//       <Sidebar />

//       <main className="flex-1 p-10">
//         <Topbar />

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <WebsiteCard id="1" title="Gadget Store" status="Published" />
//           <WebsiteCard id="2" title="Fashion Store" status="Draft" />
//           <WebsiteCard id="3" title="Beauty Store" status="Published" />
//         </div>
//       </main>
//     </div>
//   );
// }

// src/pages/Dashboard.jsx - SIMPLE VERSION
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/index.js'
import { useBuilderStore } from '../builder/state/useBuilderStore.js'

const Dashboard = ({ isDarkMode, toggleTheme }) => {
  const navigate = useNavigate()
  const { websites, createWebsite } = useBuilderStore()
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [websiteName, setWebsiteName] = useState('')

  const handleCreateWebsite = () => {
    if (websiteName.trim()) {
      const website = createWebsite(websiteName, 'blank')
      setShowCreateModal(false)
      setWebsiteName('')
      navigate(`/editor/${website.id}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Our Websites</h1>
          <p className="text-gray-600 mt-2">Create and manage your websites</p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {websites.length} Websites
            </h2>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            + New Website
          </button>
        </div>

        {websites.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-2xl">🏗️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No websites yet
            </h3>
            <p className="text-gray-600 mb-6">
              Create your first website to get started
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            >
              Create Website
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((website) => (
              <div
                key={website.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="aspect-video bg-linear-to-br from-blue-100 to-blue-50 relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl">🌐</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <button
                      onClick={() => navigate(`/editor/${website.id}`)}
                      className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Select
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {website.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Last edited {website.updatedAt}
                  </p>
                  {website.isPublished && (
                    <span className="inline-block mt-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                      Published
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Simple Create Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Create New Website
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website Name
                  </label>
                  <input
                    type="text"
                    value={websiteName}
                    onChange={(e) => setWebsiteName(e.target.value)}
                    placeholder="My Awesome Website"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    autoFocus
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateWebsite}
                    disabled={!websiteName.trim()}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium ${
                      websiteName.trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default Dashboard
