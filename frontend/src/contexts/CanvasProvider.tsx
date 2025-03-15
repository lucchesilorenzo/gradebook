import React, { createContext, useRef, useState } from "react";

import Konva from "konva";

import { Desk, DrawingToolExtended } from "@/types";

type CanvasProviderProps = {
  children: React.ReactNode;
};

type CanvasContext = {
  stageRef: React.RefObject<Konva.Stage>;
  desks: Desk[];
  isZoomActive: boolean;
  isPanActive: boolean;
  drawingTools: DrawingToolExtended[];
  setIsZoomActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPanActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDesks: React.Dispatch<React.SetStateAction<Desk[]>>;
  setDrawingTools: React.Dispatch<React.SetStateAction<DrawingToolExtended[]>>;
};

export const CanvasContext = createContext<CanvasContext | null>(null);

export default function CanvasProvider({ children }: CanvasProviderProps) {
  const stageRef = useRef<Konva.Stage>(null);

  const [desks, setDesks] = useState<Desk[]>([]);
  const [isZoomActive, setIsZoomActive] = useState(true);
  const [isPanActive, setIsPanActive] = useState(true);
  const [drawingTools, setDrawingTools] = useState<DrawingToolExtended[]>([]);

  return (
    <CanvasContext.Provider
      value={{
        stageRef,
        desks,
        isZoomActive,
        isPanActive,
        drawingTools,
        setDesks,
        setIsZoomActive,
        setIsPanActive,
        setDrawingTools,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
