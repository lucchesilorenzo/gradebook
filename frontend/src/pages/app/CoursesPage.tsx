import env from "@/lib/env";
import { useEffect } from "react";

export default function CoursesPage() {
  useEffect(() => {
    document.title = `Courses | ${env.VITE_APP_NAME}`;
  }, []);

  return <main>CoursesPage</main>;
}
