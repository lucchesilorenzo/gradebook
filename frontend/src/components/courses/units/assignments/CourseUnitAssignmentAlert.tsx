import { CircleCheckBig } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUpdateAssignmentStatus } from "@/hooks/mutations/assignments/useUpdateAssignmentStatus";
import { Assignment } from "@/types";

type CourseUnitAssignmentCardProps = {
  assignment: Assignment;
};

export default function CourseUnitAssignmentAlert({
  assignment,
}: CourseUnitAssignmentCardProps) {
  const { mutateAsync: updateAssignmentStatus } = useUpdateAssignmentStatus();

  return (
    <Alert variant="success">
      <CircleCheckBig className="h-4 w-4" />
      <AlertTitle>All grades have been entered!</AlertTitle>
      <AlertDescription>
        {assignment.is_active ? (
          <>
            Click{" "}
            <button
              className="underline"
              onClick={() => updateAssignmentStatus(assignment.id)}
            >
              here
            </button>{" "}
            to mark this assignment as complete.
          </>
        ) : (
          <span>You've already marked this assignment as completed.</span>
        )}
      </AlertDescription>
    </Alert>
  );
}
