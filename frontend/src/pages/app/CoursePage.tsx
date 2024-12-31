import H1 from "@/components/common/H1";
import CourseDetailCard from "@/components/courses/CourseDetailCard";
import { Badge } from "@/components/ui/badge";
import { useCourse } from "@/hooks/useCourse";
import { capitalize } from "@/lib/utils";
import { Navigate, useParams } from "react-router-dom";

export default function CoursePage() {
  const { courseSlug } = useParams();
  const { teacherCourses } = useCourse();

  const course = teacherCourses.find((course) => course.slug === courseSlug);
  if (!course) return <Navigate to="*" state={{ content: "course" }} />;

  return (
    <main>
      <div className="flex items-center gap-4">
        <H1>{course.name}</H1>
        <Badge>{capitalize(course.type)}</Badge>
      </div>
      <h2 className="mb-4 text-muted-foreground">{course.course_code}</h2>

      <CourseDetailCard course={course} />
    </main>
  );
}
