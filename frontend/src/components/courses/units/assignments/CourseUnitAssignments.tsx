import { useState } from "react";

import { Plus } from "lucide-react";
import { useParams } from "react-router-dom";

import CourseUnitAssignmentCard from "./CourseUnitAssignmentCard";
import CourseUnitAssignmentsPagination from "./CourseUnitAssignmentsPagination";

import FormDialog from "@/components/common/FormDialog";
import SearchInput from "@/components/common/SearchInput";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetAssignments } from "@/hooks/queries/courses/assignments/useGetAssignments";

export default function CourseUnitAssignments() {
  const { courseSlug, courseUnitSlug } = useParams();

  const [page, setPage] = useState(1);

  const { data: assignments, isLoading } = useGetAssignments({
    courseSlug,
    courseUnitSlug,
    page,
  });

  const [assignmentSearchTerm, setAssignmentSearchTerm] = useState("");

  if (!assignments) return null;

  const filteredAssignments = assignments.data.filter((assignment) =>
    assignment.title.toLowerCase().includes(assignmentSearchTerm.toLowerCase()),
  );

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
          Add new assignments for this course unit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SearchInput
            placeholder="Search assignments..."
            onSearch={setAssignmentSearchTerm}
          />

          {!filteredAssignments.length ? (
            <p>No assignments found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredAssignments.map((assignment) => (
                <CourseUnitAssignmentCard
                  key={assignment.id}
                  courseSlug={courseSlug}
                  courseUnitSlug={courseUnitSlug}
                  assignment={assignment}
                  assignmentsLoading={isLoading}
                />
              ))}
            </div>
          )}
        </div>
      </CardContent>
      {filteredAssignments.length > 0 && (
        <CardFooter>
          <CourseUnitAssignmentsPagination
            page={assignments.current_page}
            lastPage={assignments.next_page_url}
            totalPages={assignments.last_page}
            courseSlug={courseSlug}
            courseUnitSlug={courseUnitSlug}
            setPage={setPage}
          />
        </CardFooter>
      )}
    </Card>
  );
}
