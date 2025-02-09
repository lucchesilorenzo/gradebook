import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

type CourseUnitAssignmentCardProps = {
  courseSlug?: string;
  courseUnitSlug?: string;
};

export default function CourseUnitAssignmentCard({
  courseSlug,
  courseUnitSlug,
}: CourseUnitAssignmentCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold">
            Full Stack Web App
          </CardTitle>
          <Badge variant="success">Active</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-sm text-muted-foreground">
          Develop a complete web application using React, Node.js, and
          PostegreSQL.
        </p>
        <div className="mb-2 flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-2 h-4 w-4" />
          Deadline:
          <span className="ml-1 text-black">{new Date().toDateString()}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          Submissions: <span className="ml-1 text-black">1</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" asChild>
          <Link
            to={`/courses/${courseSlug}/course-units/${courseUnitSlug}/grades`}
          >
            Add grades
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
