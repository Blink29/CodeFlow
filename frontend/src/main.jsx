import React, { StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import "./styles.css";

import Canvas from "./components/ReactFlow/Canvas";
import Home from "./components/pages/home";
import FunctionRanking from "./components/pages/functionRanking";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/canvas" element={<Canvas />} />
        <Route path="/function-rankings" element={<FunctionRanking />} />
      </Routes>
    </BrowserRouter>
    {/* <Canvas /> */}
  </StrictMode>
);
