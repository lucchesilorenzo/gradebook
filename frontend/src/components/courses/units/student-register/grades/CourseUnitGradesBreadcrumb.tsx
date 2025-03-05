import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CourseUnit, TeacherCourse } from "@/types";
import { Link } from "react-router-dom";

type CourseUnitGradesBreadcrumb = {
  course: TeacherCourse;
  courseUnit: CourseUnit;
};

export default function CourseUnitGradesBreadcrumb({
  course,
  courseUnit,
}: CourseUnitGradesBreadcrumb) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/courses">Courses</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={`/courses/${course.slug}`}>{course.name}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link
              to={`/courses/${course.slug}/course-units/${courseUnit.slug}`}
            >
              {courseUnit.name}
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>Grades</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
