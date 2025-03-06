import Konva from "konva";
import { Layer, Stage } from "react-konva";

import DeskGroup from "./DeskGroup";

import { useCanvas } from "@/hooks/contexts/useCanvas";
import { handleZoom } from "@/lib/canvas-utils";
import { CANVAS_HEIGHT, CANVAS_SCALE_BY, CANVAS_WIDTH } from "@/lib/constants";

export default function Canvas() {
  const { stageRef } = useCanvas();

  function handleWheelZoom(e: Konva.KonvaEventObject<WheelEvent>) {
    if (stageRef.current) {
      handleZoom(e, stageRef.current, CANVAS_SCALE_BY);
    }
  }

  return (
    <div className="h-[600px] w-[1800px] border border-gray-300">
      <Stage
        ref={stageRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onContextMenu={(e) => e.evt.preventDefault()}
        onWheel={handleWheelZoom}
        onDragStart={() => (document.body.style.cursor = "grabbing")}
        onDragEnd={() => (document.body.style.cursor = "default")}
      >
        <Layer>
          <DeskGroup />
        </Layer>
      </Stage>
    </div>
  );
}
