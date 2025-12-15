// // src/builder/components/Sidebar.jsx
// import React from "react";

// const Sidebar = ({ addElement }) => {
//   const components = [
//     { label: "Text", type: "text" },
//     { label: "Button", type: "button" },
//     { label: "Image", type: "image" },
//     { label: "Hero", type: "hero" },
//     { label: "Footer", type: "footer" },
//   ];

//   return (
//     <div style={{ padding: "10px" }}>
//       <h3>Components</h3>
//       {components.map(comp => (
//         <button
//           key={comp.type}
//           style={{ display: "block", margin: "5px 0", width: "100%" }}
//           onClick={() => addElement(comp.type)}
//         >
//           {comp.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;
import { LayoutDashboard, Globe, Plus, Settings } from "lucide-react";

export default function SidebarD() {
  return (
    <aside className="w-64 bg-white border-r min-h-screen px-6 py-8">
      <h1 className="text-2xl font-bold text-indigo-600 mb-10">
        WebSiteBuilder
      </h1>

      <nav className="space-y-2">
        <Menu icon={<LayoutDashboard size={18} />} label="Dashboard" active />
        <Menu icon={<Globe size={18} />} label="My Websites" />
        <Menu icon={<Plus size={18} />} label="Create Website" />
        <Menu icon={<Settings size={18} />} label="Settings" />
      </nav>
    </aside>
  );
}

function Menu({ icon, label, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer
      ${active ? "bg-indigo-50 text-indigo-600 font-medium" : "text-gray-600 hover:bg-gray-100"}`}
    >
      {icon}
      {label}
    </div>
  );
}
