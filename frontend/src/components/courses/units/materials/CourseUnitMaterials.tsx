import SearchInput from "@/components/common/SearchInput";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CourseUnitMaterial } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import FormDialog from "../../../common/FormDialog";
import { Button } from "../../../ui/button";
import CourseUnitMaterialItem from "./CourseUnitMaterialItem";

type CourseUnitMaterialsProps = {
  courseUnitMaterials: CourseUnitMaterial[];
};

export default function CourseUnitMaterials({
  courseUnitMaterials,
}: CourseUnitMaterialsProps) {
  const [materialSearchTerm, setMaterialSearchTerm] = useState("");

  const filteredCourseUnitMaterials = courseUnitMaterials.filter((material) =>
    material.title.toLowerCase().includes(materialSearchTerm.toLowerCase()),
  );

  return (
    <Card className="max-w-6xl">
      <CardHeader>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="font-bold sm:text-xl">
            Course Materials
          </CardTitle>

          <FormDialog actionType="add-course-unit-material">
            <Button>
              <Plus /> Add material
            </Button>
          </FormDialog>
        </div>

        <CardDescription>
          All the materials of this course unit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <SearchInput
            placeholder="Search materials..."
            onSearch={setMaterialSearchTerm}
          />

          {!filteredCourseUnitMaterials.length ? (
            <p>No materials found.</p>
          ) : (
            <ul className="space-y-2">
              {filteredCourseUnitMaterials.map((material) => (
                <CourseUnitMaterialItem
                  key={material.id}
                  courseUnitMaterial={material}
                />
              ))}
            </ul>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
