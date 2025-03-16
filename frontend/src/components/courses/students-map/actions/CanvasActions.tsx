import { Hand, Import, PointerOff, ZoomIn, ZoomOut } from "lucide-react";

import AddDeskForm from "./AddDeskForm";
import DrawingToolsForm from "./DrawingToolsForm";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCanvas } from "@/hooks/contexts/useCanvas";
import { handleDownload, handleZoomReset } from "@/lib/canvas-utils";
import { Student } from "@/types";

type CanvasActionsProps = {
  filteredStudents: Student[];
  courseSlug: string;
};

export default function CanvasActions({
  filteredStudents,
  courseSlug,
}: CanvasActionsProps) {
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

  function handleExport() {
    if (stageRef.current) {
      handleZoomResetAction();

      stageRef.current.findOne(".background")?.show();

      const url = stageRef.current.toDataURL();
      handleDownload(url, "students-map");

      stageRef.current.findOne(".background")?.hide();
    }
  }

  return (
    <div className="flex items-center gap-4">
      <AddDeskForm
        filteredStudents={filteredStudents}
        courseSlug={courseSlug}
      />

      <DrawingToolsForm courseSlug={courseSlug} />

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

      <Button onClick={handleExport}>
        <Import /> Export
      </Button>
    </div>
  );
}
