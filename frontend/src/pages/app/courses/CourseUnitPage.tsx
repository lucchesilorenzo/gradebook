import H1 from "@/components/common/H1";
import Loading from "@/components/common/Loading";
import CourseUnitTabs from "@/components/courses/CourseUnitTabs";
import { useAttendances } from "@/hooks/queries/useAttendances";
import { useCourseBySlug } from "@/hooks/queries/useCourseBySlug";
import { Navigate, useParams } from "react-router-dom";

export default function CourseUnitPage() {
  const { courseSlug, courseUnitSlug } = useParams();
  const { data: course, isLoading: isCourseLoading } =
    useCourseBySlug(courseSlug);
  const { data: attendances, isLoading: isAttendancesLoading } = useAttendances(
    { courseSlug, courseUnitSlug },
  );

  if (isCourseLoading || isAttendancesLoading) return <Loading />;
  if (!course || !attendances || !courseSlug || !courseUnitSlug) {
    return <Navigate to="*" state={{ content: "course" }} />;
  }

  const courseUnit = course.units.find((unit) => unit.slug === courseUnitSlug);
  if (!courseUnit) return <Navigate to="*" state={{ content: "unit" }} />;

  return (
    <main className="space-y-2">
      <H1>{courseUnit.name}</H1>
      <h2>{courseUnit.description}</h2>

      <CourseUnitTabs
        course={course}
        courseUnit={courseUnit}
        attendances={attendances}
      />
    </main>
  );
}
