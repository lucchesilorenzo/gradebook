import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeacherCourse } from "@/lib/types";
import { calculateCourseProgress, capitalize } from "@/lib/utils";
import { BookOpen, Calendar, Users } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Link } from "react-router-dom";

type CourseCardProps = {
  course: TeacherCourse;
};

export default function CourseCard({ course }: CourseCardProps) {
  const start = new Date(course.start_date);
  const end = new Date(course.end_date);

  const currentStudents = course.students.length;
  const totalCourseUnits = course.units.length;

  const courseProgress = calculateCourseProgress(start, end);
  const formattedProgress =
    courseProgress > 0 && courseProgress < 100
      ? courseProgress.toFixed(2)
      : courseProgress;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-bold sm:text-xl">
            {course.name}
          </CardTitle>
          <Badge>{capitalize(course.type)}</Badge>
        </div>
        <CardDescription>{course.course_code}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">
              {start.toLocaleDateString("it-IT")} -{" "}
              {end.toLocaleDateString("it-IT")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">
              {currentStudents} / {course.max_students} students
            </span>
          </div>

          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 opacity-70" />
            <span className="text-sm text-muted-foreground">
              {totalCourseUnits} course units
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm font-medium">
              <span>Progress</span>
              <span>{formattedProgress}%</span>
            </div>
            <Progress value={courseProgress} className="mt-2 h-3" />
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              {course.description}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link to={`/courses/${course.slug}`}>Course Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
