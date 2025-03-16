import { useRef } from "react";

import Konva from "konva";
import { Group, Rect, Text } from "react-konva";

import { useCanvas } from "@/hooks/contexts/useCanvas";
import { Desk } from "@/types/canvas-types";

type DeskGroupProps = {
  desk: Desk;
  isDeskDraggable: boolean;
  setShowAlertDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DeskGroup({
  desk,
  isDeskDraggable,
  setShowAlertDialog,
}: DeskGroupProps) {
  const { isPanActive, setDesks, setSelectedDesk } = useCanvas();

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

  function handleRightClick(e: Konva.KonvaEventObject<MouseEvent>) {
    e.evt.preventDefault();

    if (e.target.parent) {
      const studentId = e.target.parent.id().split("%")[1];
      setSelectedDesk(studentId);
    }

    setShowAlertDialog(true);
  }

  return (
    <Group
      name="desk"
      id={`desk%${desk.student_id}`}
      ref={deskRef}
      x={desk.x}
      y={desk.y}
      draggable={isPanActive && isDeskDraggable}
      onContextMenu={handleRightClick}
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
