import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus } from "lucide-react";
import FormDialog from "../common/FormDialog";
import { Button } from "../ui/button";
import { CourseMaterial } from "@/lib/types";
import CourseMaterialItem from "./CourseMaterialItem";

type CourseMaterialsProps = {
  courseMaterials: CourseMaterial[];
};

export default function CourseMaterials({
  courseMaterials,
}: CourseMaterialsProps) {
  return (
    <Card className="max-w-6xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-bold sm:text-xl">
            Course Materials
          </CardTitle>

          <FormDialog actionType="add-course-material">
            <Button>
              <Plus />
              Add material
            </Button>
          </FormDialog>
        </div>
        <CardDescription>All the materials of this course unit</CardDescription>
      </CardHeader>
      <CardContent>
        {!courseMaterials.length ? (
          <p>Start adding materials!</p>
        ) : (
          <ul className="space-y-2">
            {courseMaterials.map((material) => (
              <CourseMaterialItem key={material.id} courseMaterial={material} />
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
