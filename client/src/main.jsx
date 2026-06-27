import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={store}>
     <TooltipProvider>
        <App />
      <ToastContainer/>
    </TooltipProvider>
   </Provider>
  </StrictMode>,
);
