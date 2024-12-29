import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LogInPage from "./pages/auth/LogInPage.tsx";
import AuthLayout from "./components/layouts/AuthLayout.tsx";
import { Toaster } from "sonner";
import AppLayout from "./components/layouts/AppLayout.tsx";
import DashboardPage from "./pages/app/DashboardPage.tsx";
import CoursesPage from "./pages/app/CoursesPage.tsx";

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

          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="courses" element={<CoursesPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <Toaster duration={4000} position="top-right" richColors />
    </QueryClientProvider>
  </StrictMode>,
);
