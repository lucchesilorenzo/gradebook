import { useContext } from "react";

import { CanvasContext } from "@/contexts/CanvasProvider";

export function useCanvas() {
  const context = useContext(CanvasContext);

  if (!context) {
    throw new Error("useCanvas must be used within a CanvasProvider.");
  }

  return context;
}
