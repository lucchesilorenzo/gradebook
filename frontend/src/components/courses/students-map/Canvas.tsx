import { useRef, useState } from "react";

import Konva from "konva";
import { Layer, Line, Rect, Stage } from "react-konva";

import DeskGroup from "./DeskGroup";

import { useCanvas } from "@/hooks/contexts/useCanvas";
import { handleZoom } from "@/lib/canvas-utils";
import { CANVAS_HEIGHT, CANVAS_SCALE_BY, CANVAS_WIDTH } from "@/lib/constants";
import { Desk, DrawingToolExtended } from "@/types";

type CanvasProps = {
  desks: Desk[];
  drawingTools: DrawingToolExtended[];
};

export default function Canvas({ desks, drawingTools }: CanvasProps) {
  const { stageRef, isZoomActive, setDrawingTools } = useCanvas();

  const isDrawing = useRef(false);
  const [isDeskDraggable, setIsDeskDraggable] = useState(true);

  function handleWheelZoom(e: Konva.KonvaEventObject<WheelEvent>) {
    if (stageRef.current && isZoomActive) {
      handleZoom(e, stageRef.current, CANVAS_SCALE_BY);
    }
  }

  function handleMouseDown() {
    isDrawing.current = true;

    const currentDrawingTool = drawingTools[drawingTools.length - 1];
    if (!currentDrawingTool) return;

    setDrawingTools((prev) => [
      ...prev,
      {
        ...currentDrawingTool,
        points: [],
      },
    ]);
  }

  function handleMouseMove(e: Konva.KonvaEventObject<MouseEvent>) {
    if (!isDrawing.current || !stageRef.current) return;

    if (e.evt.altKey && e.evt.button === 0) {
      setIsDeskDraggable(false);

      const point = stageRef.current.getRelativePointerPosition();
      if (!point) return;

      setDrawingTools((prev) => {
        const newTools = [...prev];
        const currentTool = newTools[newTools.length - 1];

        if (currentTool) {
          newTools[newTools.length - 1] = {
            ...currentTool,
            points: [...currentTool.points, [point.x, point.y]],
          };
        }

        return newTools;
      });
    }
  }

  function handleMouseUp() {
    isDrawing.current = false;

    setIsDeskDraggable(true);
  }

  return (
    <div className="h-[800px] w-[1800px] border border-gray-300">
      <Stage
        ref={stageRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onContextMenu={(e) => e.evt.preventDefault()}
        onWheel={handleWheelZoom}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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

          {drawingTools.map((tool, i) => (
            <Line
              key={i}
              points={tool.points.flat()}
              stroke={tool.color}
              strokeWidth={tool.size}
              tension={0}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                tool.name === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}

          {desks.map((desk) => (
            <DeskGroup
              key={desk.student_id}
              desk={desk}
              isDeskDraggable={isDeskDraggable}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
