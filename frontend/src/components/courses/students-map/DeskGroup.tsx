import { useRef } from "react";

import Konva from "konva";
import { Group, Rect, Text } from "react-konva";

import { useCanvas } from "@/hooks/contexts/useCanvas";
import { Student } from "@/types";
import { Desk } from "@/types/canvas-types";

type DeskGroupProps = {
  student: Student;
};

export default function DeskGroup({ student }: DeskGroupProps) {
  const { isPanActive } = useCanvas();
  const deskRef = useRef<Konva.Group>(null);

  const desk: Desk = student.desk_position && JSON.parse(student.desk_position);

  return (
    <Group ref={deskRef} x={desk.x} y={desk.y} draggable={isPanActive}>
      <Rect width={200} height={100} stroke="gray" />

      <Text
        x={50}
        y={40}
        width={100}
        text={`${student.first_name} ${student.last_name}`}
        fontSize={15}
        wrap="word"
        align="center"
      />
    </Group>
  );
}
