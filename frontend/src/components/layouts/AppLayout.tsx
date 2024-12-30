import { useSharedData } from "@/hooks/queries/useSharedData";
import { Outlet } from "react-router-dom";
import AuthGuard from "../common/AuthGuard";
import Header from "../common/Header";
import CourseProvider from "@/contexts/CourseProvider";

export default function AppLayout() {
  const [{ data: teacherCourses = [], isLoading: isTeacherCoursesLoading }] =
    useSharedData();

  const isLoading = isTeacherCoursesLoading;

  return (
    <AuthGuard>
      <Header />
      <main className="px-6 py-1 md:px-10 md:py-3">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <CourseProvider teacherCourses={teacherCourses}>
            <Outlet />
          </CourseProvider>
        )}
      </main>
    </AuthGuard>
  );
}
