import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeacherCourse } from "@/lib/types";
import CourseUnit from "./CourseUnit";

type CourseUnitsListProps = {
  course: TeacherCourse;
};

export default function CourseUnitsList({ course }: CourseUnitsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Course Units</CardTitle>
        <CardDescription>
          Details about course units of the course.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!course.units.length ? (
          <p>No units found for this course.</p>
        ) : (
          <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {course.units.map((unit) => (
              <CourseUnit
                key={unit.id}
                courseUnit={unit}
                courseId={course.id}
                courseSlug={course.slug}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
