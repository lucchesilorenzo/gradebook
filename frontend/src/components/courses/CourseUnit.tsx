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
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";

type CourseUnitProps = {
  courseUnit: CourseUnit;
  courseSlug: string;
};

export default function CourseUnit({
  courseUnit,
  courseSlug,
}: CourseUnitProps) {
  const theory = courseUnit.theory_hours;
  const lab = courseUnit.lab_hours;
  const total = theory + lab;

  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex items-center justify-between">
          <CardTitle className="text-md font-bold sm:text-xl">
            {courseUnit.name}
          </CardTitle>
          <Badge className="py-1">45% Complete</Badge>
        </div>
        <CardDescription>{courseUnit.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <Progress value={45} />

        <div className="flex flex-col gap-2">
          <p className="mt-2 flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="font-semibold">Total:</span>{" "}
            <span>
              {total}h (Theory: {theory}h | Lab: {lab}h)
            </span>
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
