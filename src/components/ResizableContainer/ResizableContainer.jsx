import { useRef } from "react";

import './ResizableContainer.css'

const ResizableContainer = (props) => {
  const resizableContainer = useRef();

  const handleMove = (event) => {
    const container = resizableContainer.current.getBoundingClientRect();
    const mouseY = ((event.clientY - container.y) / container.height) * 100;
    const separator = Math.min(Math.max(mouseY, 10), 90);
    resizableContainer.current.style.setProperty("--separator", `${separator}`);
  };

  const onDragStart = (event) => {
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", onDragOver);
    document.addEventListener("mouseup", onDragOver);
  };

  const onDragOver = (event) => {
    document.removeEventListener("mousemove", handleMove);
    document.removeEventListener("mouseleave", onDragOver);
    document.removeEventListener("mouseup", onDragOver);
  };

  return (
    <div
      className="resizable-container"
      draggable={false}
      ref={resizableContainer}
    >
      <div className="area1">{props.children[0]}</div>
      <div className="resize-bar" onMouseDown={onDragStart}></div>
      <div className="area2">{props.children[1]}</div>
    </div>
  );
};

export default ResizableContainer;
