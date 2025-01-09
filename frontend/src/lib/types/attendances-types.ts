export type Attendance = {
  id: string;
  student_id: string;
  course_id: string;
  course_unit_id: string;
  date: Date;
  start_time: Date;
  end_time: Date | null;
  status: string;
  created_at: Date;
  updated_at: Date;
};
