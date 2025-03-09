import React, { createContext, useRef, useState } from "react";

import Konva from "konva";

import { Desk } from "@/types";

type CanvasProviderProps = {
  children: React.ReactNode;
};

type CanvasContext = {
  stageRef: React.RefObject<Konva.Stage>;
  desks: Desk[];
  isZoomActive: boolean;
  isPanActive: boolean;
  setIsZoomActive: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPanActive: React.Dispatch<React.SetStateAction<boolean>>;
  setDesks: React.Dispatch<React.SetStateAction<Desk[]>>;
};

export const CanvasContext = createContext<CanvasContext | null>(null);

export default function CanvasProvider({ children }: CanvasProviderProps) {
  const stageRef = useRef<Konva.Stage>(null);

  const [desks, setDesks] = useState<Desk[]>([]);
  const [isZoomActive, setIsZoomActive] = useState(true);
  const [isPanActive, setIsPanActive] = useState(true);

  return (
    <CanvasContext.Provider
      value={{
        stageRef,
        desks,
        isZoomActive,
        isPanActive,
        setIsZoomActive,
        setIsPanActive,
        setDesks,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}
