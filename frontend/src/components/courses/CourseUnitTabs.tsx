import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentRegister from "./StudentRegister";

export default function CourseUnitTabs() {
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
      <TabsContent value="student-register">
        <StudentRegister />
      </TabsContent>
      <TabsContent value="course-materials">Course Materials</TabsContent>
    </Tabs>
  );
}
