export type Dashboard = {
  title: string;
  value: number | string;
  description: string;
  icon: React.ElementType;
};

export type DashboardSummary = {
  courses_count: number;
  total_students: number;
  next_lesson: {
    start_datetime: string;
    course_unit_id: string;
    course: {
      id: string;
      name: string;
    };
    course_unit: {
      id: string;
      name: string;
    };
  };
  notifications: {
    read_notifications: number;
    unread_notifications: number;
  };
};
