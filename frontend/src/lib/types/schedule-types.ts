export type Schedule = {
  id: string;
  course: {
    id: string;
    course_code: string;
  };
  course_id: string;
  course_unit: {
    id: string;
    name: string;
  };
  course_unit_id: string;
  start_datetime: string;
  end_datetime: string;
  created_at: string;
  updated_at: string;
};
