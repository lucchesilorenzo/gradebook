import CourseProvider from "@/contexts/CourseProvider";
import { useCourses } from "@/hooks/queries/useCourses";
import { Outlet } from "react-router-dom";
import AuthGuard from "../common/AuthGuard";
import Header from "../common/Header";
import Loading from "../common/Loading";
import { useUserSettings } from "@/hooks/queries/useUserSettings";
import UserProvider from "@/contexts/UserProvider";

export default function AppLayout() {
  const { data: userSettings, isLoading: userSettingsLoading } =
    useUserSettings();
  const { data: teacherCourses = [], isLoading: teacherCoursesLoading } =
    useCourses();

  const isLoading = userSettingsLoading || teacherCoursesLoading;

  if (!userSettings) return null;

  return (
    <AuthGuard>
      <UserProvider userSettings={userSettings}>
        <CourseProvider teacherCourses={teacherCourses}>
          <Header />
          <main className="px-6 py-1 md:px-10 md:py-3">
            {isLoading ? <Loading /> : <Outlet />}
          </main>
        </CourseProvider>
      </UserProvider>
    </AuthGuard>
  );
}
