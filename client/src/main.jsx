import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TooltipProvider>
        <App />
      <ToastContainer/>
    </TooltipProvider>
  </StrictMode>,
);
