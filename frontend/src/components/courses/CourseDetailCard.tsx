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
  const start = new Date(course.start_date);
  const end = new Date(course.end_date);

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
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Tutor:</span>{" "}
            <span>
              {course.tutor.first_name} {course.tutor.last_name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="font-semibold">Total students:</span>{" "}
            <span>{course.students.length}</span>
          </div>

          <div className="lg:flex lg:items-center lg:gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Course duration:</span>{" "}
            </div>
            <span>
              {start.toLocaleDateString("it-IT")} -{" "}
              {end.toLocaleDateString("it-IT")}
            </span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
