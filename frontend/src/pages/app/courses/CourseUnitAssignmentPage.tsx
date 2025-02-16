import H1 from "@/components/common/H1";
import Loading from "@/components/common/Loading";
import CourseUnitAssignmentBreadcrumb from "@/components/courses/units/grades/CourseUnitAssignmentBreadcrumb";
import { useAssignment } from "@/hooks/mutations/assignments/useAssignment";
import { useCourseBySlug } from "@/hooks/queries/courses/useCourseBySlug";
import { Navigate, useParams } from "react-router-dom";

export default function CourseUnitAssignmentPage() {
  const { courseSlug, courseUnitSlug, assignmentSlug } = useParams();
  const { data: assignment, isLoading: isAssignmentLoading } = useAssignment({
    courseSlug,
    courseUnitSlug,
    assignmentSlug,
  });
  const { data: course, isLoading: isCourseLoading } =
    useCourseBySlug(courseSlug);

  const isLoading = isAssignmentLoading || isCourseLoading;

  if (isLoading) return <Loading />;

  if (
    !course ||
    !assignment ||
    !courseSlug ||
    !courseUnitSlug ||
    !assignmentSlug
  ) {
    return <Navigate to="*" state={{ content: "assignment" }} />;
  }

  const courseUnit = course.units.find((unit) => unit.slug === courseUnitSlug);
  if (!courseUnit) return <Navigate to="*" state={{ content: "unit" }} />;

  return (
    <main className="space-y-4">
      <CourseUnitAssignmentBreadcrumb
        course={course}
        courseUnit={courseUnit}
        assignment={assignment}
      />

      <H1>Grades</H1>
    </main>
  );
}
