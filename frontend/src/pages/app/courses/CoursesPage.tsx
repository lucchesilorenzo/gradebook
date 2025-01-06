import H1 from "@/components/common/H1";
import CoursesList from "@/components/courses/CoursesList";
import env from "@/lib/env";
import { useEffect } from "react";

export default function CoursesPage() {
  useEffect(() => {
    document.title = `Courses | ${env.VITE_APP_NAME}`;
  }, []);

  return (
    <main>
      <H1>My Courses</H1>

      <section className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CoursesList />
      </section>
    </main>
  );
}
