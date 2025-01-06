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
  start_datetime: Date;
  end_datetime: Date;
  created_at: Date;
  updated_at: Date;
};
