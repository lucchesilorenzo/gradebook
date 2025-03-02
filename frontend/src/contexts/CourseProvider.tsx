import { TeacherCourse } from "@/types";
import React, { createContext } from "react";

type CourseProviderProps = {
  children: React.ReactNode;
  teacherCourses: TeacherCourse[];
};

type CourseContext = {
  teacherCourses: TeacherCourse[];
};

export const CourseContext = createContext<CourseContext | null>(null);

export default function CourseProvider({
  children,
  teacherCourses,
}: CourseProviderProps) {
  return (
    <CourseContext.Provider value={{ teacherCourses }}>
      {children}
    </CourseContext.Provider>
  );
}
