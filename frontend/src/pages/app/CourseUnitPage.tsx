import H1 from "@/components/common/H1";
import CourseUnitTabs from "@/components/courses/CourseUnitTabs";
import { useCourse } from "@/hooks/useCourse";
import { Navigate, useParams } from "react-router-dom";

export default function CourseUnitPage() {
  const { courseSlug, courseUnitSlug } = useParams();
  const { teacherCourses } = useCourse();

  const course = teacherCourses.find((course) => course.slug === courseSlug);
  if (!course) return <Navigate to="*" state={{ content: "course" }} />;

  const courseUnit = course.units.find((unit) => unit.slug === courseUnitSlug);
  if (!courseUnit) return <Navigate to="*" state={{ content: "unit" }} />;
  return (
    <main className="space-y-2">
      <H1>{courseUnit.name}</H1>
      <h2>{courseUnit.description}</h2>
      <CourseUnitTabs students={course.students} />
    </main>
  );
}
