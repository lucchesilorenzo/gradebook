import Konva from "konva";
import { Layer, Rect, Stage } from "react-konva";

import DeskGroup from "./DeskGroup";

import { useCanvas } from "@/hooks/contexts/useCanvas";
import { handleZoom } from "@/lib/canvas-utils";
import { CANVAS_HEIGHT, CANVAS_SCALE_BY, CANVAS_WIDTH } from "@/lib/constants";
import { Desk } from "@/types";

type CanvasProps = {
  desks: Desk[];
};

export default function Canvas({ desks }: CanvasProps) {
  const { stageRef, isZoomActive } = useCanvas();

  function handleWheelZoom(e: Konva.KonvaEventObject<WheelEvent>) {
    if (stageRef.current && isZoomActive) {
      handleZoom(e, stageRef.current, CANVAS_SCALE_BY);
    }
  }

  return (
    <div className="h-[800px] w-[1800px] border border-gray-300">
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
          <Rect
            name="background"
            x={0}
            y={0}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            fill="#F4F4F5"
            listening={false}
            visible={false}
          />

          {desks.map((desk) => (
            <DeskGroup key={desk.student_id} desk={desk} />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
