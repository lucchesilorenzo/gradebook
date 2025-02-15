import { useCourse } from "@/hooks/useCourse";
import CourseCard from "./CourseCard";

export default function CoursesList() {
  const { teacherCourses } = useCourse();

  return teacherCourses.map((course) => (
    <CourseCard key={course.id} course={course} />
  ));
}
