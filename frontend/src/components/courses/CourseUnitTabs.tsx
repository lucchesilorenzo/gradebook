import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentRegisterTable from "../tables/courses/StudentRegisterTable";
import { Student } from "@/lib/types";
import { columns } from "@/components/tables/courses/columns";

type CourseUnitTabsProps = {
  students: Student[];
};

export default function CourseUnitTabs({ students }: CourseUnitTabsProps) {
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
        <StudentRegisterTable columns={columns} data={students} />
      </TabsContent>
      <TabsContent value="course-materials" className="my-4">
        Course Materials
      </TabsContent>
    </Tabs>
  );
}
