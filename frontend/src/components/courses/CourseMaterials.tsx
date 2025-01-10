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

export default function CourseMaterials() {
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
          <CourseMaterial />
        </ul>
      </CardContent>
    </Card>
  );
}
