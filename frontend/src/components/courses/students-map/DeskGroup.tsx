import { useRef } from "react";

import Konva from "konva";
import { Group, Rect, Text } from "react-konva";

import { useCanvas } from "@/hooks/contexts/useCanvas";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "@/lib/constants";

export default function DeskGroup() {
  const { isPanActive } = useCanvas();
  const deskRef = useRef<Konva.Group>(null);

  return (
    <Group
      ref={deskRef}
      x={CANVAS_WIDTH / 2}
      y={CANVAS_HEIGHT / 2}
      offset={{ x: 100, y: 50 }}
      draggable={isPanActive}
    >
      <Rect width={200} height={100} stroke="gray" />

      <Text
        x={50}
        y={40}
        width={100}
        text="Lorenzo Lucchesi"
        fontSize={15}
        wrap="word"
        align="center"
      />
    </Group>
  );
}
