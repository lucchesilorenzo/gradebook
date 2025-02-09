import SearchInput from "@/components/common/SearchInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import FormDialog from "../../../common/FormDialog";
import { Button } from "../../../ui/button";
import CourseUnitAssignmentCard from "./CourseUnitAssignmentCard";
import { useParams } from "react-router-dom";

export default function CourseUnitAssignments() {
  const { courseSlug, courseUnitSlug } = useParams();

  return (
    <Card className="max-w-6xl">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="font-bold sm:text-xl">
            Course Assignments
          </CardTitle>

          <FormDialog actionType="add-course-unit-assignment">
            <Button>
              <Plus /> Add assignment
            </Button>
          </FormDialog>
        </div>

        <CardDescription>
          Add new assigments for this course unit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SearchInput
            placeholder="Search assignments..."
            onSearch={() => {}}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <CourseUnitAssignmentCard
              courseSlug={courseSlug}
              courseUnitSlug={courseUnitSlug}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
