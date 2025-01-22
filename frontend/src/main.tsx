import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import LogInPage from "./pages/auth/LogInPage.tsx";
import AuthLayout from "./components/layouts/AuthLayout.tsx";
import { Toaster } from "sonner";
import AppLayout from "./components/layouts/AppLayout.tsx";
import DashboardPage from "./pages/app/DashboardPage.tsx";
import CoursesPage from "./pages/app/courses/CoursesPage.tsx";
import CoursePage from "./pages/app/courses/CoursePage.tsx";
import CourseUnitPage from "./pages/app/courses/CourseUnitPage.tsx";
import CalendarPage from "./pages/app/CalendarPage.tsx";
import ProfilePage from "./pages/app/ProfilePage.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="login" />} />
            <Route path="login" element={<LogInPage />} />
          </Route>

          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="courses">
              <Route index element={<CoursesPage />} />
              <Route path=":courseSlug">
                <Route index element={<CoursePage />} />
                <Route path="course-units">
                  <Route path=":courseUnitSlug" element={<CourseUnitPage />} />
                </Route>
              </Route>
            </Route>
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="teacher">
              <Route index element={<Navigate to="profile" />} />
              <Route path="profile" element={<ProfilePage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>

      <Toaster
        duration={4000}
        visibleToasts={1}
        position="top-right"
        richColors
      />
    </QueryClientProvider>
  </StrictMode>,
);
