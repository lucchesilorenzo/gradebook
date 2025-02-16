import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { CourseUnit, TeacherCourse } from "@/lib/types";
import { Assignment } from "@/lib/types/assignment-types";
import { Link } from "react-router-dom";

type CourseUnitBreadcrumbProps = {
  course: TeacherCourse;
  courseUnit: CourseUnit;
  assignment: Assignment;
};

export default function CourseUnitAssignmentBreadcrumb({
  course,
  courseUnit,
  assignment,
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
          <BreadcrumbPage>{assignment.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
