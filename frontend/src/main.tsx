import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LogInPage from "./pages/auth/LogInPage.tsx";
import AuthLayout from "./components/layouts/AuthLayout.tsx";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<LogInPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster duration={3000} position="top-right" richColors />
    </QueryClientProvider>
  </StrictMode>,
);
