import { useDashboard } from "@/hooks/queries/useDashboard";
import { format } from "date-fns";
import { Bell, BookOpen, Clock, UsersIcon } from "lucide-react";
import DashboardCard from "./DashboardCard";

export default function DashboardSummary() {
  const {
    data = {
      courses_count: 0,
      total_students: 0,
      next_lesson: {
        start_datetime: "",
        course: {
          name: "N/A",
        },
        course_unit: {
          name: "N/A",
        },
      },
    },
    isLoading,
  } = useDashboard();

  const formattedDate = data.next_lesson.start_datetime
    ? format(new Date(data.next_lesson.start_datetime), "dd/MM/yyyy 'at' HH:mm")
    : "No schedule found";

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
      value: data.next_lesson.course_unit.name,
      description: `${formattedDate} | Course: ${data.next_lesson.course.name}`,
      icon: Clock,
    },
    {
      title: "Notifications",
      value: 0,
      description: "2 new, 1 unread",
      icon: Bell,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {dashboardData.map((card) => (
        <DashboardCard key={card.title} card={card} isLoading={isLoading} />
      ))}
    </div>
  );
}
