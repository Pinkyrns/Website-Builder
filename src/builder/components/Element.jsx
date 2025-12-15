import { useBuilderStore } from "../../state/useBuilderStore";

export default function Element({ element }) {
  const setSelected = useBuilderStore((s) => s.setSelected);

  if (element.type === "text")
    return (
      <p
        onClick={() => setSelected(element)}
        style={{ ...element.styles, cursor: "pointer" }}
      >
        {element.content}
      </p>
    );

  if (element.type === "button")
    return (
      <button onClick={() => setSelected(element)} style={element.styles}>
        Click
      </button>
    );

  if (element.type === "image")
  return (
    <img
      onClick={() => setSelected(element)}
      src={element.src || "https://via.placeholder.com/400"}
      style={{ width: "100%", cursor: "pointer" }}
    />
  );

  return null;
}
