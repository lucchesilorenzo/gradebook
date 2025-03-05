import H1 from "@/components/common/H1";
import H2 from "@/components/common/H2";
import Loading from "@/components/common/Loading";
import CourseUnitGradesBreadcrumb from "@/components/courses/units/student-register/grades/CourseUnitGradesBreadcrumb";
import { columns } from "@/components/tables/courses/units/student-register/grades/columns";
import StudentGradesTable from "@/components/tables/courses/units/student-register/grades/StudentGradesTable";
import { useGetStudentGradesForUnit } from "@/hooks/queries/courses/grades/useGetStudentGradesForUnit";
import { useGetCourseBySlug } from "@/hooks/queries/courses/useGetCourseBySlug";
import { useNavigate, useParams } from "react-router-dom";

export default function StudentGradesPage() {
  const { courseSlug, courseUnitSlug, studentId } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading: isCourseLoading } =
    useGetCourseBySlug(courseSlug);

  const { data: gradesData, isLoading: isGradesLoading } =
    useGetStudentGradesForUnit({ courseSlug, courseUnitSlug, studentId });

  if (isCourseLoading || isGradesLoading) return <Loading />;

  if (!course || !gradesData || !courseSlug || !courseUnitSlug || !studentId) {
    navigate("*", { state: { content: "course" } });
    return null;
  }

  const courseUnit = course.units.find((unit) => unit.slug === courseUnitSlug);
  if (!courseUnit) {
    navigate("*", { state: { content: "unit" } });
    return null;
  }

  const average =
    gradesData.grades.reduce((total, g) => total + g.grade, 0) /
    gradesData.grades.length;

  return (
    <main className="space-y-4">
      <CourseUnitGradesBreadcrumb course={course} courseUnit={courseUnit} />

      <H1>
        {gradesData.student.first_name} {gradesData.student.last_name}'s grades
      </H1>

      <H2>
        Average:
        {gradesData.grades.length > 0 ? (
          <span className="ml-1">{average.toFixed(2)} / 100</span>
        ) : (
          <span className="ml-1">No grades.</span>
        )}
      </H2>

      <StudentGradesTable data={gradesData.grades} columns={columns} />
    </main>
  );
}
