import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBuilderStore } from "../state/useBuilderStore";

const Header = () => {
  const {
    editor,
    pages,
    currentPage,
    setCurrentPage,
    setActiveView,
    saveFromEditor,
  } = useBuilderStore();

  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  /* ================= ACTIONS ================= */

  const undo = () => editor?.UndoManager.undo();
  const redo = () => editor?.UndoManager.redo();

  const togglePreview = () => {
    if (!editor) return;

    if (isPreview) {
      editor.stopCommand("preview");
    } else {
      editor.runCommand("preview");
    }

    setIsPreview((p) => !p);
  };

  const setDevice = (device) => {
    if (!editor) return;

    const map = {
      desktop: "Desktop",
      tablet: "Tablet",
      mobile: "Mobile portrait",
    };

    editor.setDevice(map[device]);
    setActiveView(device);
  };

  const handleSave = () => {
    if (!editor || isSaving) return;

    setIsSaving(true);
    setSaved(false);

    saveFromEditor();

    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 700);
  };

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="h-20 px-4 flex items-center justify-between border-b bg-white shadow-sm"
    >
      <div className="flex flex-col w-full gap-1">
        {/* ================= TOP ROW ================= */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <strong className="text-gray-900 tracking-wide">CMS Builder</strong>

            <MotionButton className="btn-primary">SEO</MotionButton>
          </div>

          <input
            placeholder="yourdomain.com"
            className="border px-2 py-1 rounded text-sm w-44"
          />

          <div className="flex items-center gap-2">
            <MotionButton onClick={handleSave} disabled={isSaving}>
              <AnimatePresence mode="wait">
                {isSaving ? (
                  <motion.span key="saving">Saving…</motion.span>
                ) : saved ? (
                  <motion.span key="saved">Saved ✔</motion.span>
                ) : (
                  <motion.span key="save">Save</motion.span>
                )}
              </AnimatePresence>
            </MotionButton>

            <MotionButton className="btn-success">Publish</MotionButton>
          </div>
        </div>

        {/* ================= BOTTOM ROW ================= */}
        <div className="flex items-center justify-between border-t pt-1">
          <div className="flex items-center gap-2">
            <select
              value={currentPage}
              onChange={(e) => setCurrentPage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            >
              {pages.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <MotionIcon onClick={() => setDevice("desktop")}>🖥</MotionIcon>
            <MotionIcon onClick={() => setDevice("tablet")}>📱</MotionIcon>
            <MotionIcon onClick={() => setDevice("mobile")}>📲</MotionIcon>
          </div>

          <div className="flex items-center gap-2">
            {/* COPY (Duplicate selected component) */}
            <MotionIcon
              title="Duplicate"
              onClick={() => editor?.runCommand("core:component-clone")}
            >
              🟪
            </MotionIcon>

            <MotionIcon onClick={undo}>↩</MotionIcon>
            <MotionIcon onClick={redo}>↪</MotionIcon>

            <MotionButton
              onClick={togglePreview}
              className={isPreview ? "bg-blue-600 text-white" : ""}
            >
              {isPreview ? "✏ Edit" : "👁 Preview"}
            </MotionButton>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

/* ================= MOTION COMPONENTS ================= */

const MotionButton = ({ children, className = "", ...props }) => (
  <motion.button
    whileHover={{ y: -1 }}
    whileTap={{ scale: 0.95 }}
    className={`px-3 py-1 rounded text-sm ${className}`}
    {...props}
  >
    {children}
  </motion.button>
);

const MotionIcon = ({ children, ...props }) => (
  <motion.button
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    className="border rounded px-2 py-1"
    {...props}
  >
    {children}
  </motion.button>
);

export default Header;
