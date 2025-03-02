import { CourseContext } from "@/contexts/CourseProvider";
import { useContext } from "react";

export function useCourse() {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider.");
  }

  return context;
}
