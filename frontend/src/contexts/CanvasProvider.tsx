import React, { createContext, useRef, useState } from "react";

import Konva from "konva";

type CanvasProviderProps = {
  children: React.ReactNode;
};

type CanvasContext = {
  stageRef: React.RefObject<Konva.Stage>;
  isZoomActive: boolean;
  isPanActive: boolean;
  setIsZoomActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPanActive: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CanvasContext = createContext<CanvasContext | null>(null);

export default function CanvasProvider({ children }: CanvasProviderProps) {
  const stageRef = useRef<Konva.Stage>(null);

  const [isZoomActive, setIsZoomActive] = useState(true);
  const [isPanActive, setIsPanActive] = useState(true);

  return (
    <CanvasContext.Provider
      value={{
        stageRef,
        isZoomActive,
        isPanActive,
        setIsZoomActive,
        setIsPanActive,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
