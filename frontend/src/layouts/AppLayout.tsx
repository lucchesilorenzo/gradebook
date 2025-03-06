import { Outlet } from "react-router-dom";

import AuthGuard from "@/components/common/AuthGuard";
import Header from "@/components/common/Header";
import Loading from "@/components/common/Loading";
import CanvasProvider from "@/contexts/CanvasProvider";
import CourseProvider from "@/contexts/CourseProvider";
import UserProvider from "@/contexts/UserProvider";
import { useGetCourses } from "@/hooks/queries/courses/useGetCourses";
import { useGetUserSettings } from "@/hooks/queries/users/useGetUserSettings";

export default function AppLayout() {
  const { data: userSettings, isLoading: userSettingsLoading } =
    useGetUserSettings();
  const { data: teacherCourses = [], isLoading: teacherCoursesLoading } =
    useGetCourses();

  const isLoading = userSettingsLoading || teacherCoursesLoading;

  if (!userSettings) return null;

  return (
    <AuthGuard>
      <UserProvider userSettings={userSettings}>
        <CourseProvider teacherCourses={teacherCourses}>
          <CanvasProvider>
            <Header />
            <main className="px-6 py-1 md:px-10 md:py-3">
              {isLoading ? <Loading /> : <Outlet />}
            </main>
          </CanvasProvider>
        </CourseProvider>
      </UserProvider>
    </AuthGuard>
  );
}
