import { Hand, PointerOff, ZoomIn, ZoomOut } from "lucide-react";

import AddDeskForm from "./AddDeskForm";

import { LoadingButton } from "@/components/common/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCanvas } from "@/hooks/contexts/useCanvas";
import { useUpdateStudentsDeskPositions } from "@/hooks/queries/courses/useUpdateStudentsDeskPositions";
import { handleZoomReset } from "@/lib/canvas-utils";
import { Desk, Student } from "@/types";

type CanvasActionsProps = {
  filteredStudents: Student[];
  desks: Desk[];
  courseSlug: string;
};

export default function CanvasActions({
  filteredStudents,
  desks,
  courseSlug,
}: CanvasActionsProps) {
  const { mutateAsync: updateStudentsDeskPositions, isPending } =
    useUpdateStudentsDeskPositions(courseSlug);

  const {
    stageRef,
    isPanActive,
    isZoomActive,
    setIsZoomActive,
    setIsPanActive,
  } = useCanvas();

  function handleZoomResetAction() {
    if (stageRef.current && isZoomActive) {
      handleZoomReset(stageRef.current);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <AddDeskForm filteredStudents={filteredStudents} />

      <LoadingButton
        disabled={!desks.length}
        isLoading={isPending}
        loadingText="Saving..."
        onClick={() => updateStudentsDeskPositions(desks)}
      >
        Save
      </LoadingButton>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => setIsZoomActive((prev) => !prev)}>
              {isZoomActive ? <ZoomOut /> : <ZoomIn />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isZoomActive ? "Disable Zoom" : "Enable Zoom"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button onClick={handleZoomResetAction}>Reset Zoom</Button>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={() => setIsPanActive((prev) => !prev)}>
              {isPanActive ? <PointerOff /> : <Hand />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isPanActive ? "Disable Pan" : "Enable Pan"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
