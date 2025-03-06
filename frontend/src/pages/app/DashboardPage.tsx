import { useEffect } from "react";

import H1 from "@/components/common/H1";
import AcademyCard from "@/components/dashboard/AcademyCard";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import TasksCard from "@/components/dashboard/tasks/TasksCard";
import env from "@/lib/env";

export default function DashboardPage() {
  useEffect(() => {
    document.title = `Dashboard | ${env.VITE_APP_NAME}`;
  }, []);

  return (
    <main className="space-y-6">
      <H1>My Dashboard</H1>

      <DashboardSummary />

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <TasksCard />
        <AcademyCard />
      </section>
    </main>
  );
}
