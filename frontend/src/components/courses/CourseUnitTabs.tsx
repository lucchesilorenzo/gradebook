import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentRegisterTable from "../tables/courses/StudentRegisterTable";
import { CourseUnit, Student } from "@/lib/types";
import { columns } from "@/components/tables/courses/columns";
import { useEffect } from "react";
import env from "@/lib/env";

type CourseUnitTabsProps = {
  students: Student[];
  courseUnit: CourseUnit;
};

export default function CourseUnitTabs({
  students,
  courseUnit,
}: CourseUnitTabsProps) {
  useEffect(() => {
    document.title = `${courseUnit.name} | ${env.VITE_APP_NAME}`;
  }, [courseUnit.name]);

  const studentsWithCourseUnit = students.map((student) => ({
    ...student,
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
        <StudentRegisterTable columns={columns} data={studentsWithCourseUnit} />
      </TabsContent>
      <TabsContent value="course-materials" className="my-4">
        Course Materials
      </TabsContent>
    </Tabs>
  );
}
