import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import SkinDetail from "./SkinDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomThemeProvider from "./ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CustomThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/skin/:id" element={<SkinDetail />} />
        </Routes>
      </BrowserRouter>
    </CustomThemeProvider>
  </React.StrictMode>
);
