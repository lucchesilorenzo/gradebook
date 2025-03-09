import { useRef } from "react";

import Konva from "konva";
import { Group, Rect, Text } from "react-konva";

import { useCanvas } from "@/hooks/contexts/useCanvas";
import { Desk } from "@/types/canvas-types";

type DeskGroupProps = {
  desk: Desk;
};

export default function DeskGroup({ desk }: DeskGroupProps) {
  const { setDesks, isPanActive } = useCanvas();
  const deskRef = useRef<Konva.Group>(null);

  function handleDragEnd() {
    if (deskRef.current) {
      const stagePosition = deskRef.current.getAbsolutePosition();

      setDesks((prev) =>
        prev.map((d) =>
          d.student_id === desk.student_id
            ? { ...d, x: stagePosition.x, y: stagePosition.y }
            : d,
        ),
      );
    }
  }

  return (
    <Group
      ref={deskRef}
      x={desk.x}
      y={desk.y}
      draggable={isPanActive}
      onDragEnd={handleDragEnd}
    >
      <Rect width={200} height={100} stroke="gray" />

      <Text
        x={50}
        y={40}
        width={100}
        text={`${desk.student_first_name} ${desk.student_last_name}`}
        fontSize={15}
        wrap="word"
        align="center"
      />
    </Group>
  );
}
