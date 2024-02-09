import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Canvas from "./components/ReactFlow/Canvas";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Canvas />
  </StrictMode>
);
