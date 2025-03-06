import React, { createContext, useRef } from "react";

import Konva from "konva";

type CanvasProviderProps = {
  children: React.ReactNode;
};

type CanvasContext = {
  stageRef: React.RefObject<Konva.Stage>;
};

export const CanvasContext = createContext<CanvasContext | null>(null);

export default function CanvasProvider({ children }: CanvasProviderProps) {
  const stageRef = useRef<Konva.Stage>(null);

  return (
    <CanvasContext.Provider value={{ stageRef }}>
      {children}
    </CanvasContext.Provider>
  );
}
