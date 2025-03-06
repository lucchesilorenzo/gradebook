import CourseCard from "./CourseCard";

import { useCourse } from "@/hooks/contexts/useCourse";

export default function CoursesList() {
  const { teacherCourses } = useCourse();

  return teacherCourses.map((course) => (
    <CourseCard key={course.id} course={course} />
  ));
}
