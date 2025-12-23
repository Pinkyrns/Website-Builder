import React, { useState } from "react";
import { useBuilderStore } from "../state/useBuilderStore";
import { Icons } from "../../components/Icons/Icons.jsx";

/* ---------- SAFE ICON HELPER ---------- */
const SafeIcon = ({ icon: Icon, fallback }) => {
  if (!Icon) return <span className="text-lg">{fallback}</span>;
  return <Icon className="w-5 h-5 mx-auto mb-1" />;
};

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("elements");

  const editor = useBuilderStore((state) => state.editor);

  /* ---------- ADD ELEMENT ---------- */
  const addElement = (type) => {
    if (!editor) return;

    switch (type) {
      case "text":
        editor.addComponents("<p>New text</p>");
        break;
      case "heading":
        editor.addComponents("<h2>New heading</h2>");
        break;
      case "button":
        editor.addComponents('<button class="btn btn-primary">Click me</button>');
        break;
      case "image":
        editor.addComponents({
          type: "image",
          attributes: {
            src: "/templates/gadget-store/images/products/product-1.png",
            style: "max-width:200px;",
          },
        });
        break;
      case "divider":
        editor.addComponents("<hr />");
        break;
      case "container":
        editor.addComponents('<div class="container"><p>Container</p></div>');
        break;
      case "section":
        editor.addComponents("<section><p>Section</p></section>");
        break;
      case "columns":
        editor.addComponents(`
          <div class="row">
            <div class="col">Column 1</div>
            <div class="col">Column 2</div>
          </div>
        `);
        break;
      default:
        break;
    }
  };

  /* ---------- UI DATA ---------- */
  const tabs = [
    { id: "elements", label: "Elements", icon: Icons?.Box, fallback: "📦" },
    { id: "pages", label: "Pages", icon: Icons?.File, fallback: "📄" },
    { id: "assets", label: "Assets", icon: Icons?.Folder, fallback: "📁" },
  ];

  const elements = [
    { id: "text", label: "Text", icon: Icons?.Type, fallback: "📝" },
    { id: "heading", label: "Heading", icon: Icons?.Type, fallback: "🔤" },
    { id: "button", label: "Button", icon: Icons?.Square, fallback: "🔘" },
    { id: "image", label: "Image", icon: Icons?.Image, fallback: "🖼️" },
    { id: "divider", label: "Divider", icon: Icons?.Minus, fallback: "➖" },
    { id: "container", label: "Container", icon: Icons?.Box, fallback: "📦" },
    { id: "section", label: "Section", icon: Icons?.Square, fallback: "⬜" },
    { id: "columns", label: "Columns", icon: Icons?.Columns, fallback: "📊" },
  ];

  return (
    <div className="h-full flex flex-col border-r bg-white">

      {/* Tabs */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-sm ${
              activeTab === tab.id
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500"
            }`}
          >
            <SafeIcon icon={tab.icon} fallback={tab.fallback} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === "elements" && (
          <div className="grid grid-cols-2 gap-3">
            {elements.map((el) => (
              <div
                key={el.id}
                onClick={() => addElement(el.id)}
                className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-blue-50"
              >
                <SafeIcon icon={el.icon} fallback={el.fallback} />
                <span className="text-xs">{el.label}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab !== "elements" && (
          <div className="text-center text-sm text-gray-500 mt-10">
            Coming soon
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
