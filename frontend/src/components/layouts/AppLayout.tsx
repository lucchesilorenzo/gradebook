import CourseProvider from "@/contexts/CourseProvider";
import { useCourses } from "@/hooks/queries/useCourses";
import { Outlet } from "react-router-dom";
import AuthGuard from "../common/AuthGuard";
import Header from "../common/Header";
import Loading from "../common/Loading";

export default function AppLayout() {
  const { data: teacherCourses = [], isLoading } = useCourses();

  return (
    <AuthGuard>
      <Header />
      <main className="px-6 py-1 md:px-10 md:py-3">
        {isLoading ? (
          <Loading />
        ) : (
          <CourseProvider teacherCourses={teacherCourses}>
            <Outlet />
          </CourseProvider>
        )}
      </main>
    </AuthGuard>
  );
}
