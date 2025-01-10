export type TeacherCourse = {
  id: string;
  tutor_id: string;
  name: string;
  slug: string;
  course_code: string;
  description: string;
  max_students: number;
  start_date: string;
  end_date: string;
  type: string;
  created_at: string;
  updated_at: string;
  students: {
    id: string;
    course_id: string;
    first_name: string;
    last_name: string;
    email: string;
    tax_id: string;
    phone_number: string;
    gender: string;
    attendance_rate: number;
    created_at: string;
    updated_at: string;
  }[];
  tutor: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    tax_id: string;
    phone_number: string;
    gender: string;
    created_at: string;
    updated_at: string;
  };
  units: {
    id: string;
    name: string;
    slug: string;
    description: string;
    theory_hours: number;
    lab_hours: number;
    created_at: string;
    updated_at: string;
    pivot: {
      course_id: string;
      course_unit_id: string;
    };
  }[];
  pivot: {
    user_id: string;
    course_id: string;
  };
};

export type CourseUnit = TeacherCourse["units"][number];

export type Student = TeacherCourse["students"][number];

export type StudentRegisterData = Student & {
  course_id: TeacherCourse["id"];
  course_unit_id: CourseUnit["id"];
  status?: string;
};
