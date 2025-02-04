import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { TeacherCourse } from "@/lib/types";
import { Link } from "react-router-dom";

type CourseUnitBreadcrumbProps = {
  course: TeacherCourse;
  courseUnit: string;
};

export default function CourseUnitBreadcrumb({
  course,
  courseUnit,
}: CourseUnitBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/courses">Courses</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbLink asChild>
          <Link to={`/courses/${course.slug}`}>{course.name}</Link>
        </BreadcrumbLink>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>{courseUnit}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
