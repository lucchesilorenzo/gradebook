import { useState } from "react";

import { Hand, PointerOff, ZoomIn, ZoomOut } from "lucide-react";

import AddDeskForm from "./AddDeskForm";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCanvas } from "@/hooks/contexts/useCanvas";
import { handleZoomReset } from "@/lib/canvas-utils";

export default function CanvasActions() {
  const { stageRef } = useCanvas();
  const [isZoomActive, setIsZoomActive] = useState(false);
  const [isPanActive, setIsPanActive] = useState(false);

  function handleZoomResetAction() {
    if (stageRef.current) {
      handleZoomReset(stageRef.current);
    }
  }

  return (
    <div className="flex items-center gap-4">
      <AddDeskForm />

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
