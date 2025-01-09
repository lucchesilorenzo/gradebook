export type TeacherCourse = {
  id: string;
  tutor_id: string;
  name: string;
  slug: string;
  course_code: string;
  description: string;
  max_students: number;
  start_date: Date;
  end_date: Date;
  type: string;
  created_at: Date;
  updated_at: Date;
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
    created_at: Date;
    updated_at: Date;
  }[];
  tutor: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    tax_id: string;
    phone_number: string;
    gender: string;
    created_at: Date;
    updated_at: Date;
  };
  units: {
    id: string;
    name: string;
    slug: string;
    description: string;
    theory_hours: number;
    lab_hours: number;
    created_at: Date;
    updated_at: Date;
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
