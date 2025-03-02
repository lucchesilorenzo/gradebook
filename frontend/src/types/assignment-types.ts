import { Student } from "./course-types";

export type Assignment = {
  id: string;
  user_id: string;
  course_id: string;
  course_unit_id: string;
  title: string;
  slug: string;
  description: string;
  deadline: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  submission_count: number;
  students: AssignmentTable[];
};

export type AssignmentTable = Student & {
  pivot: {
    assignment_id: string;
    student_id: string;
    grade: number | null;
    notes: string | null;
  };
};

export type AssignmentsWithPagination = {
  current_page: number;
  data: Assignment[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
};
