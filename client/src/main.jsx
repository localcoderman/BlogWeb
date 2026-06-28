import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";


createRoot(document.getElementById("root")).render(
  <StrictMode>
   <Provider store={store}>
     <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <TooltipProvider>
        <App />
      <ToastContainer/>
    </TooltipProvider>
     </PersistGate>
   </Provider>
  </StrictMode>,
);
