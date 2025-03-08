import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import StudentsMap from "./students-map/StudentsMap";
import CourseUnitsList from "./units/CourseUnitsList";

import { TeacherCourse } from "@/types";

type CourseTabsProps = {
  course: TeacherCourse;
};

export default function CourseTabs({ course }: CourseTabsProps) {
  return (
    <Tabs defaultValue="course-units" className="space-y-4">
      <TabsList>
        <TabsTrigger value="course-units">Course Units</TabsTrigger>
        <TabsTrigger value="students-map">Students Map</TabsTrigger>
      </TabsList>

      <TabsContent value="course-units">
        {!course.units.length ? (
          <p>No units found for this course.</p>
        ) : (
          <CourseUnitsList course={course} />
        )}
      </TabsContent>
      <TabsContent value="students-map">
        <StudentsMap courseSlug={course.slug} />
      </TabsContent>
    </Tabs>
  );
}
