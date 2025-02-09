import { columns } from "@/components/tables/courses/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCourseUnitMaterials } from "@/hooks/queries/courses/useCourseUnitMaterials";
import env from "@/lib/env";
import { CourseUnit, TeacherCourse } from "@/lib/types";
import { Attendance } from "@/lib/types/attendance-types";
import { useEffect } from "react";
import Loading from "../../common/Loading";
import StudentRegisterTable from "../../tables/courses/StudentRegisterTable";
import CourseUnitMaterials from "./materials/CourseUnitMaterials";
import CourseUnitAssignments from "./assignments/CourseUnitAssignments";

type CourseUnitTabsProps = {
  course: TeacherCourse;
  courseUnit: CourseUnit;
  attendances: Attendance[];
};

export default function CourseUnitTabs({
  course,
  courseUnit,
  attendances,
}: CourseUnitTabsProps) {
  useEffect(() => {
    document.title = `${courseUnit?.name} | ${env.VITE_APP_NAME}`;
  }, [courseUnit?.name]);

  const { data: courseUnitMaterials = [], isLoading } = useCourseUnitMaterials({
    courseSlug: course.slug,
    courseUnitSlug: courseUnit.slug,
  });

  const studentRegisterData = course.students.map((student) => ({
    ...student,
    status: attendances.find((a) => a.student_id === student.id)?.status,
    course_id: course.id,
    course_unit_id: courseUnit.id,
  }));

  if (isLoading) return <Loading />;

  return (
    <Tabs defaultValue="student-register">
      <TabsList>
        <TabsTrigger value="student-register" className="px-4">
          Student Register
        </TabsTrigger>
        <TabsTrigger value="course-materials" className="px-4">
          Materials
        </TabsTrigger>
        <TabsTrigger value="course-assignments" className="px-4">
          Assignments
        </TabsTrigger>
      </TabsList>

      <TabsContent value="student-register" className="my-4">
        <StudentRegisterTable
          columns={columns}
          data={studentRegisterData}
          courseSlug={course.slug}
          courseUnitSlug={courseUnit.slug}
        />
      </TabsContent>
      <TabsContent value="course-materials" className="my-4">
        <CourseUnitMaterials courseUnitMaterials={courseUnitMaterials} />
      </TabsContent>
      <TabsContent value="course-assignments" className="my-4">
        <CourseUnitAssignments />
      </TabsContent>
    </Tabs>
  );
}
