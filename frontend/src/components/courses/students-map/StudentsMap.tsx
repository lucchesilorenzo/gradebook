import { useEffect } from "react";

import Canvas from "./Canvas";
import CanvasActions from "./actions/CanvasActions";

import Loading from "@/components/common/Loading";
import { useCanvas } from "@/hooks/contexts/useCanvas";
import { useGetCourseStudents } from "@/hooks/queries/courses/useGetCourseStudents";
import { Desk } from "@/types";

type StudentsMapProps = {
  courseSlug: string;
};

export default function StudentsMap({ courseSlug }: StudentsMapProps) {
  const { desks, setDesks } = useCanvas();
  const { data: students = [], isLoading } = useGetCourseStudents(courseSlug);

  // Filter out students that already have a desk
  const filteredStudents = students.filter(
    (student) => !desks.find((desk) => desk.student_id === student.id),
  );

  // Get desks (from backend)
  const newDesks = filteredStudents
    .filter(
      (student) => student.desk_position && JSON.parse(student.desk_position),
    )
    .map((student) => {
      const deskPosition: Pick<Desk, "x" | "y"> =
        student.desk_position && JSON.parse(student.desk_position);

      return {
        student_id: student.id,
        student_first_name: student.first_name,
        student_last_name: student.last_name,
        x: deskPosition.x,
        y: deskPosition.y,
      };
    });

  // Set desks after component mounts
  useEffect(() => {
    if (newDesks.length > 0) {
      setDesks(newDesks);
    }
  }, [newDesks, setDesks]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-fit rounded-lg p-4 shadow-lg">
            <CanvasActions
              filteredStudents={filteredStudents}
              desks={desks}
              courseSlug={courseSlug}
            />
          </div>

          <Canvas desks={desks} />
        </div>
      )}
    </>
  );
}
