import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { MarketplaceProvider } from "./context/MarketplaceContext.jsx";
import "./index.css";
import { AdminProvider } from "./context/AdminContext.jsx";
import { ToastProvider } from "./context/ToastContext.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(

  <StrictMode>
   <ErrorBoundary>
    <BrowserRouter>
      <AuthProvider>
        <MarketplaceProvider>
          <AdminProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </AdminProvider>
        </MarketplaceProvider>
      </AuthProvider>
    </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);