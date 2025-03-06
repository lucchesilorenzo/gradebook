import { useNavigate, useParams } from "react-router-dom";

import H1 from "@/components/common/H1";
import Loading from "@/components/common/Loading";
import CourseUnitBreadcrumb from "@/components/courses/units/CourseUnitBreadcrumb";
import CourseUnitTabs from "@/components/courses/units/CourseUnitTabs";
import { useGetCourseBySlug } from "@/hooks/queries/courses/useGetCourseBySlug";
import { useGetAttendances } from "@/hooks/queries/useGetAttendances";

export default function CourseUnitPage() {
  const { courseSlug, courseUnitSlug } = useParams();
  const navigate = useNavigate();

  const { data: course, isLoading: isCourseLoading } =
    useGetCourseBySlug(courseSlug);
  const { data: attendances, isLoading: isAttendancesLoading } =
    useGetAttendances({ courseSlug, courseUnitSlug });

  if (isCourseLoading || isAttendancesLoading) return <Loading />;
  if (!course || !attendances || !courseSlug || !courseUnitSlug) {
    navigate("*", { state: { content: "course" } });
    return null;
  }

  const courseUnit = course.units.find((unit) => unit.slug === courseUnitSlug);
  if (!courseUnit) {
    navigate("*", { state: { content: "unit" } });
    return null;
  }

  return (
    <main className="space-y-2">
      <CourseUnitBreadcrumb course={course} courseUnit={courseUnit.name} />

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
