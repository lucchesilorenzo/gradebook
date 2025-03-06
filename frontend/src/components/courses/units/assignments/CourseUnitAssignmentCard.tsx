import { Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Assignment } from "@/types/assignment-types";

type CourseUnitAssignmentCardProps = {
  assignment: Assignment;
  courseSlug?: string;
  courseUnitSlug?: string;
  assignmentsLoading: boolean;
};

export default function CourseUnitAssignmentCard({
  assignment,
  courseSlug,
  courseUnitSlug,
  assignmentsLoading,
}: CourseUnitAssignmentCardProps) {
  return (
    <Card>
      {assignmentsLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold">
                {assignment.title}
              </CardTitle>
              <Badge variant={assignment.is_active ? "success" : "destructive"}>
                {assignment.is_active ? "Active" : "Completed"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              {assignment.description}
            </p>

            <div className="mb-2 flex items-center text-sm text-muted-foreground">
              <Calendar className="mr-2 h-4 w-4" />
              Deadline:
              <span className="ml-1 text-black">
                {new Date(assignment.deadline).toLocaleDateString("it-IT")}
              </span>
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="mr-2 h-4 w-4" />
              Submissions:{" "}
              <span className="ml-1 text-black">
                {assignment.submission_count} / {assignment.students.length}
              </span>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" asChild>
              <Link
                to={`/courses/${courseSlug}/course-units/${courseUnitSlug}/assignments/${assignment.slug}`}
              >
                Add grades
              </Link>
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
