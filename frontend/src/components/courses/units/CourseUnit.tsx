import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { type CourseUnit } from "@/lib/types";
import { ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Progress } from "../../ui/progress";
import { differenceInHours } from "date-fns";

type CourseUnitProps = {
  courseUnit: CourseUnit;
  courseId: string;
  courseSlug: string;
};

export default function CourseUnit({
  courseUnit,
  courseId,
  courseSlug,
}: CourseUnitProps) {
  const elapsedHours = courseUnit.schedules.reduce((total, schedule) => {
    const startTime = new Date(schedule.start_datetime);
    const endTime = new Date(schedule.end_datetime);

    if (schedule.course_id === courseId && endTime < new Date()) {
      return total + differenceInHours(endTime, startTime);
    }

    return total;
  }, 0);

  const totalHours = courseUnit.schedules.reduce((total, schedule) => {
    const startTime = new Date(schedule.start_datetime);
    const endTime = new Date(schedule.end_datetime);

    if (schedule.course_id !== courseId) return total;

    return total + differenceInHours(endTime, startTime);
  }, 0);

  const courseUnitProgress =
    totalHours > 0 ? (elapsedHours / totalHours) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <CardTitle className="text-md font-bold sm:text-xl">
            {courseUnit.name}
          </CardTitle>
          <Badge className="py-1">{courseUnitProgress}% Complete</Badge>
        </div>
        <CardDescription>{courseUnit.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={courseUnitProgress} />

        <div className="flex flex-col gap-2">
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">Total:</span>{" "}
            <span>{totalHours}h</span>
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full py-5" asChild>
          <Link to={`/courses/${courseSlug}/course-units/${courseUnit.slug}`}>
            Access Unit <ArrowRight />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
