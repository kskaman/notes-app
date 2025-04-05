import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ThemeManager from "./context/ThemeManager.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeManager>
      <App />
    </ThemeManager>
  </StrictMode>
);
