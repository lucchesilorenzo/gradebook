import Canvas from "./Canvas";
import CanvasActions from "./actions/CanvasActions";

import Loading from "@/components/common/Loading";
import { useGetCourseStudents } from "@/hooks/queries/courses/useGetCourseStudents";

type StudentsMapProps = {
  courseSlug: string;
};

export default function StudentsMap({ courseSlug }: StudentsMapProps) {
  const { data: students = [], isLoading } = useGetCourseStudents(courseSlug);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          <div className="mx-auto w-fit rounded-lg p-4 shadow-lg">
            <CanvasActions students={students} courseSlug={courseSlug} />
          </div>

          <Canvas students={students} />
        </div>
      )}
    </>
  );
}
