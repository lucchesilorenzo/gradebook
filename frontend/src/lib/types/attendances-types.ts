export type Attendance = {
  id: string;
  student_id: string;
  course_id: string;
  course_unit_id: string;
  date: string;
  start_time: string;
  end_time: string | null;
  status: string;
  created_at: string;
  updated_at: string;
};
