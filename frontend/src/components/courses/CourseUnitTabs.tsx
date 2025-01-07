import { columns } from "@/components/tables/courses/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import env from "@/lib/env";
import { CourseUnit, TeacherCourse } from "@/lib/types";
import { useEffect } from "react";
import StudentRegisterTable from "../tables/courses/StudentRegisterTable";

type CourseUnitTabsProps = {
  course: TeacherCourse;
  courseUnit: CourseUnit;
};

export default function CourseUnitTabs({
  course,
  courseUnit,
}: CourseUnitTabsProps) {
  useEffect(() => {
    document.title = `${courseUnit?.name} | ${env.VITE_APP_NAME}`;
  }, [courseUnit?.name]);

  const studentsWithCourseAndUnit = course.students.map((student) => ({
    ...student,
    course_id: course.id,
    course_unit_id: courseUnit.id,
  }));

  return (
    <Tabs defaultValue="student-register">
      <TabsList>
        <TabsTrigger value="student-register" className="px-4">
          Student Register
        </TabsTrigger>
        <TabsTrigger value="course-materials" className="px-4">
          Course Materials
        </TabsTrigger>
      </TabsList>

      <TabsContent value="student-register" className="my-4">
        <StudentRegisterTable
          columns={columns}
          data={studentsWithCourseAndUnit}
        />
      </TabsContent>
      <TabsContent value="course-materials" className="my-4">
        Course Materials
      </TabsContent>
    </Tabs>
  );
}
