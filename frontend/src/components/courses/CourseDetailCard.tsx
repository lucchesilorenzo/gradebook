import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeacherCourse } from "@/lib/types";

type CourseDetailCardProps = {
  course: TeacherCourse;
};

export default function CourseDetailCard({ course }: CourseDetailCardProps) {
  return (
    <Card className="max-w-[800px]">
      <CardHeader>
        <CardTitle className="text-md font-bold sm:text-xl">
          Course Description
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{course.description}</p>
      </CardContent>
      <CardFooter>
        <p>
          <span className="font-semibold">Tutor:</span>{" "}
          <span>
            {course.tutor.first_name} {course.tutor.last_name}
          </span>
        </p>
      </CardFooter>
    </Card>
  );
}
