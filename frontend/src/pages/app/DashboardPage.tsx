import env from "@/lib/env";
import { useEffect } from "react";

export default function DashboardPage() {
  useEffect(() => {
    document.title = `Dashboard | ${env.VITE_APP_NAME}`;
  }, []);

  return <main>DashboardPage</main>;
}
