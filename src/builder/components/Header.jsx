import React from "react";

const Header = () => {
  return (
    <div
      style={{
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        borderBottom: "1px solid #e5e7eb",
        background: "#ffffff",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <strong style={{ fontSize: "16px" }}>EDITOR</strong>

        <button
          style={{
            padding: "6px 12px",
            background: "#8b5cf6",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          SEO Settings
        </button>
      </div>

      {/* Center */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <select style={{ padding: "6px", borderRadius: "6px" }}>
          <option>About-Us</option>
          <option>Home</option>
          <option>Contact</option>
        </select>

        <button style={iconBtn}>🖥</button>
        <button style={iconBtn}>📱</button>

        <input
          placeholder="customdomain.com"
          style={{
            padding: "6px 10px",
            width: "200px",
            borderRadius: "6px",
            border: "1px solid #d1d5db",
          }}
        />
        <span style={{ color: "#8b5cf6", fontSize: "13px" }}>
          Custom Domain
        </span>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button style={primaryBtn}>New Blank Canvas</button>
        <button style={successBtn}>Publish</button>
        <button style={outlineBtn}>Save</button>
        <button style={iconBtn}>↩</button>
        <button style={iconBtn}>↪</button>
        <button style={iconBtn}>👁</button>
        <button style={iconBtn}>⛶</button>
      </div>
    </div>
  );
};

const iconBtn = {
  padding: "6px 8px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  background: "#fff",
  cursor: "pointer",
};

const primaryBtn = {
  padding: "6px 12px",
  background: "#3b82f6",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

const successBtn = {
  padding: "6px 12px",
  background: "#10b981",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
};

const outlineBtn = {
  padding: "6px 12px",
  border: "1px solid #d1d5db",
  borderRadius: "6px",
  background: "#fff",
};

export default Header;
