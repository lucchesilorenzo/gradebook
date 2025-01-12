import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import FormDialog from "../../../common/FormDialog";
import { Button } from "../../../ui/button";
import { CourseUnitMaterial } from "@/lib/types";
import CourseUnitMaterialItem from "./CourseUnitMaterialItem";

type CourseUnitMaterialsProps = {
  courseUnitMaterials: CourseUnitMaterial[];
};

export default function CourseUnitMaterials({
  courseUnitMaterials,
}: CourseUnitMaterialsProps) {
  return (
    <Card className="max-w-6xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-bold sm:text-xl">
            Course Materials
          </CardTitle>

          <FormDialog actionType="add-course-unit-material">
            <Button>
              <Plus />
              Add material
            </Button>
          </FormDialog>
        </div>
        <CardDescription>All the materials of this course unit</CardDescription>
      </CardHeader>
      <CardContent>
        {!courseUnitMaterials.length ? (
          <p>Start adding materials!</p>
        ) : (
          <ul className="space-y-2">
            {courseUnitMaterials.map((material) => (
              <CourseUnitMaterialItem
                key={material.id}
                courseUnitMaterial={material}
              />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
