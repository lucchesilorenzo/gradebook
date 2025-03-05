import H1 from "@/components/common/H1";
import Loading from "@/components/common/Loading";
import CourseUnitGradesBreadcrumb from "@/components/courses/units/student-register/grades/CourseUnitGradesBreadcrumb";
import { useGetCourseBySlug } from "@/hooks/queries/courses/useGetCourseBySlug";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentGradesPage() {
  const { courseSlug, courseUnitSlug, studentId } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading: isCourseLoading } =
    useGetCourseBySlug(courseSlug);

  if (isCourseLoading) return <Loading />;

  if (!course || !courseSlug || !courseUnitSlug || !studentId) {
    navigate("*", { state: { content: "course" } });
    return null;
  }

  const courseUnit = course.units.find((unit) => unit.slug === courseUnitSlug);
  if (!courseUnit) {
    navigate("*", { state: { content: "unit" } });
    return null;
  }

  return (
    <main>
      <CourseUnitGradesBreadcrumb course={course} courseUnit={courseUnit} />

      <H1>Grades</H1>
    </main>
  );
}
