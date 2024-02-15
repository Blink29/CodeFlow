import React, { StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Canvas from "./components/ReactFlow/Canvas";
import Home from "./components/pages/home";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas" element={<Canvas />} />
      </Routes>
    </BrowserRouter>
    {/* <Canvas /> */}
  </StrictMode>
);
