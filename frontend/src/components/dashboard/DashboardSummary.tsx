import { BookOpen, Clock, UsersIcon } from "lucide-react";
import DashboardCard from "./DashboardCard";
import { useDashboard } from "@/hooks/queries/useDashboard";

export default function DashboardSummary() {
  const {
    data = { courses_count: 0, total_students: 0, next_lesson: "N/A" },
    isLoading,
  } = useDashboard();

  const dashboardData = [
    {
      title: "Total Courses",
      value: data.courses_count,
      description: "Total number of courses",
      icon: BookOpen,
    },
    {
      title: "Total Students",
      value: data.total_students,
      description: "Total number of students",
      icon: UsersIcon,
    },
    {
      title: "Next Lesson",
      value: "Test",
      description: "Algorithms",
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {dashboardData.map((card) => (
        <DashboardCard key={card.title} card={card} isLoading={isLoading} />
      ))}
    </div>
  );
}
