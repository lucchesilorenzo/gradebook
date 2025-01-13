import DashboardCard from "./DashboardCard";

export default function DashboardSummary() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <DashboardCard />
      <DashboardCard />
      <DashboardCard />
    </div>
  );
}
