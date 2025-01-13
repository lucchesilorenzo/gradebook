import H1 from "@/components/common/H1";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import env from "@/lib/env";
import { useEffect } from "react";
import TasksCard from "@/components/dashboard/TasksCard";

export default function DashboardPage() {
  useEffect(() => {
    document.title = `Dashboard | ${env.VITE_APP_NAME}`;
  }, []);

  return (
    <main className="space-y-6">
      <H1>My Dashboard</H1>

      <DashboardSummary />
      <TasksCard />
    </main>
  );
}
