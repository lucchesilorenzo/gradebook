import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeacherCourse } from "@/lib/types";
import { BookOpen, Calendar, Users } from "lucide-react";

type CourseDetailCardProps = {
  course: TeacherCourse;
};

export default function CourseDetailCard({ course }: CourseDetailCardProps) {
  const start = course.start_date.toLocaleDateString("it-IT");
  const end = course.end_date.toLocaleDateString("it-IT");

  return (
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle className="text-md font-bold sm:text-2xl">
          Course Description
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{course.description}</p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-col gap-2">
          <p className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Tutor:</span>{" "}
            <span>
              {course.tutor.first_name} {course.tutor.last_name}
            </span>
          </p>

          <p className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Total students:</span>{" "}
            <span>{course.students.length}</span>
          </p>

          <p className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Course duration:</span>{" "}
            <span>
              {start} - {end}
            </span>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
