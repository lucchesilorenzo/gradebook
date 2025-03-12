import React, { createContext, useRef, useState } from "react";

import Konva from "konva";

import { Desk } from "@/types";
import { TDrawingToolsFormSchema } from "@/validations/canvas-validations";

type CanvasProviderProps = {
  children: React.ReactNode;
};

type CanvasContext = {
  stageRef: React.RefObject<Konva.Stage>;
  desks: Desk[];
  isZoomActive: boolean;
  isPanActive: boolean;
  drawingTool: TDrawingToolsFormSchema;
  setIsZoomActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPanActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDesks: React.Dispatch<React.SetStateAction<Desk[]>>;
  setDrawingTool: React.Dispatch<React.SetStateAction<TDrawingToolsFormSchema>>;
};

export const CanvasContext = createContext<CanvasContext | null>(null);

export default function CanvasProvider({ children }: CanvasProviderProps) {
  const stageRef = useRef<Konva.Stage>(null);

  const [desks, setDesks] = useState<Desk[]>([]);
  const [isZoomActive, setIsZoomActive] = useState(true);
  const [isPanActive, setIsPanActive] = useState(true);
  const [drawingTool, setDrawingTool] = useState<TDrawingToolsFormSchema>({
    name: "",
    color: "#000000",
    size: 5,
  });

  return (
    <CanvasContext.Provider
      value={{
        stageRef,
        desks,
        isZoomActive,
        isPanActive,
        drawingTool,
        setIsZoomActive,
        setIsPanActive,
        setDesks,
        setDrawingTool,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
