import { PDFDownloadLink } from "@react-pdf/renderer";
import { File } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import H1 from "@/components/common/H1";
import H2 from "@/components/common/H2";
import Loading from "@/components/common/Loading";
import CourseUnitAssignmentAlert from "@/components/courses/units/assignments/CourseUnitAssignmentAlert";
import AssignmentToPDF from "@/components/courses/units/assignments/grades/AssignmentToPDF";
import CourseUnitAssignmentBreadcrumb from "@/components/courses/units/assignments/grades/CourseUnitAssignmentBreadcrumb";
import AssignmentTable from "@/components/tables/courses/units/assignments/AssignmentTable";
import { columns } from "@/components/tables/courses/units/assignments/columns";
import { Button } from "@/components/ui/button";
import { useGetAssignment } from "@/hooks/queries/courses/assignments/useGetAssignment";
import { useGetCourseBySlug } from "@/hooks/queries/courses/useGetCourseBySlug";

export default function CourseUnitAssignmentPage() {
  const { courseSlug, courseUnitSlug, assignmentSlug } = useParams();
  const navigate = useNavigate();

  const { data: assignment, isLoading: isAssignmentLoading } = useGetAssignment(
    {
      courseSlug,
      courseUnitSlug,
      assignmentSlug,
    },
  );

  const { data: course, isLoading: isCourseLoading } =
    useGetCourseBySlug(courseSlug);

  const isLoading = isAssignmentLoading || isCourseLoading;

  if (isLoading) return <Loading />;

  if (
    !course ||
    !assignment ||
    !courseSlug ||
    !courseUnitSlug ||
    !assignmentSlug
  ) {
    navigate("*", { state: { content: "assignment" } });
    return null;
  }

  const courseUnit = course.units.find((unit) => unit.slug === courseUnitSlug);
  if (!courseUnit) {
    navigate("*", { state: { content: "unit" } });
    return null;
  }

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
        <div className="space-y-2">
          <CourseUnitAssignmentAlert assignment={assignment} />

          <div>
            <PDFDownloadLink
              document={<AssignmentToPDF assignment={assignment} />}
              fileName={`${assignment.title}.pdf`}
            >
              {({ loading }) => (
                <Button>
                  <File />
                  <span>{!loading ? "Export as PDF" : "Loading..."}</span>
                </Button>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      )}

      <AssignmentTable
        data={assignment.students}
        columns={columns}
        assignment={assignment}
      />
    </main>
  );
}
