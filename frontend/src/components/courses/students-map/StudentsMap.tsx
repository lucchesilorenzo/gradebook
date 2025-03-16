import Canvas from "./Canvas";
import CanvasActions from "./actions/CanvasActions";

import Loading from "@/components/common/Loading";
import { useCanvas } from "@/hooks/contexts/useCanvas";
import { useGetCourseStudents } from "@/hooks/queries/courses/useGetCourseStudents";

type StudentsMapProps = {
  courseSlug: string;
};

export default function StudentsMap({ courseSlug }: StudentsMapProps) {
  const { desks, drawingTools } = useCanvas();
  const { data: students = [], isLoading } = useGetCourseStudents(courseSlug);

  // Filter out students that already have a desk
  const filteredStudents = students.filter(
    (student) => !desks.find((desk) => desk.student_id === student.id),
  );

  // Filter out desks that don't belong to the current course
  const courseDesks = desks.filter((desk) => desk.course_slug === courseSlug);

  // Filter out drawing tools that don't belong to the current course
  const courseDrawingTools = drawingTools.filter(
    (tool) => tool.course_slug === courseSlug,
  );

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-fit rounded-lg p-4 shadow-lg">
            <CanvasActions
              filteredStudents={filteredStudents}
              courseSlug={courseSlug}
            />
          </div>

          <Canvas desks={courseDesks} drawingTools={courseDrawingTools} />
        </div>
      )}
    </>
  );
}
