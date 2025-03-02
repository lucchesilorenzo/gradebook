import H1 from "@/components/common/H1";
import Loading from "@/components/common/Loading";
import CourseBreadcrumb from "@/components/courses/CourseBreadcrumb";
import CourseDetailCard from "@/components/courses/CourseDetailCard";
import CourseUnitsList from "@/components/courses/units/CourseUnitsList";
import { Badge } from "@/components/ui/badge";
import { useGetCourseBySlug } from "@/hooks/queries/courses/useGetCourseBySlug";
import env from "@/lib/env";
import { capitalize } from "@/lib/utils";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CoursePage() {
  const { courseSlug } = useParams();
  const { data: course, isLoading } = useGetCourseBySlug(courseSlug);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = `${course?.name} | ${env.VITE_APP_NAME}`;
  }, [course?.name]);

  if (isLoading) return <Loading />;
  if (!courseSlug || !course) {
    navigate("*", { state: { content: "course" } });
    return null;
  }

  return (
    <main className="space-y-4">
      <CourseBreadcrumb course={course.name} />

      <div>
        <div className="flex items-center gap-4">
          <H1>{course.name}</H1>
          <Badge>{capitalize(course.type)}</Badge>
        </div>
        <h2 className="text-muted-foreground">{course.course_code}</h2>
      </div>

      <CourseDetailCard course={course} />

      {!course.units.length ? (
        <p>No units found for this course.</p>
      ) : (
        <CourseUnitsList course={course} />
      )}
    </main>
  );
}
