import H1 from "@/components/common/H1";
import H2 from "@/components/common/H2";
import Loading from "@/components/common/Loading";
import CourseUnitAssignmentBreadcrumb from "@/components/courses/units/grades/CourseUnitAssignmentBreadcrumb";
import AssignmentTable from "@/components/tables/courses/assignments/AssignmentTable";
import { columns } from "@/components/tables/courses/assignments/columns";
import { useAssignment } from "@/hooks/queries/courses/assignments/useAssignment";
import { useCourseBySlug } from "@/hooks/queries/courses/useCourseBySlug";
import { Navigate, useParams } from "react-router-dom";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CircleCheckBig } from "lucide-react";

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

      <H1>{assignment.title}</H1>
      <H2 className="font-normal text-muted-foreground">
        {assignment.description}
      </H2>

      {assignment.submission_count === assignment.students.length && (
        <Alert>
          <CircleCheckBig className="h-4 w-4" />
          <AlertTitle>All grades have been entered!</AlertTitle>
          <AlertDescription>
            Click <button>here</button> to mark this assignment as complete.
          </AlertDescription>
        </Alert>
      )}

      <AssignmentTable
        data={assignment.students}
        columns={columns}
        assignment={assignment}
      />
    </main>
  );
}
