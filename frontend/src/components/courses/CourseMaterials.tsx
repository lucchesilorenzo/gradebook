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
import CourseMaterial from "./CourseMaterial";
import { useCourseMaterials } from "@/hooks/queries/useCourseMaterials";
import Loading from "../common/Loading";

export default function CourseMaterials() {
  const { data: courseMaterials = [], isLoading } = useCourseMaterials();

  if (isLoading) return <Loading />;

  return (
    <Card className="max-w-6xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-md font-bold sm:text-xl">
            Course Materials
          </CardTitle>

          <FormDialog actionType="course-materials">
            <Button>
              <Plus />
              Add material
            </Button>
          </FormDialog>
        </div>
        <CardDescription>All the materials of this course unit</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {courseMaterials.map((material) => (
            <CourseMaterial key={material.id} material={material} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
