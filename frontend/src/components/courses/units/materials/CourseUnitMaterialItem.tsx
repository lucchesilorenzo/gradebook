import { CircleX, Edit, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

import CourseUnitMaterialAlertDialog from "./CourseUnitMaterialAlertDialog";

import FormDialog from "@/components/common/FormDialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { courseUnitMaterialIcons } from "@/lib/data";
import env from "@/lib/env";
import { CourseUnitMaterial } from "@/types";

type CourseUnitMaterialItem = {
  courseUnitMaterial: CourseUnitMaterial;
};

export default function CourseUnitMaterialItem({
  courseUnitMaterial,
}: CourseUnitMaterialItem) {
  let link;

  switch (courseUnitMaterial.type) {
    case "PDF":
      link = `${env.VITE_BASE_URL}/storage/${courseUnitMaterial.file}`;
      break;
    default:
      link = courseUnitMaterial.url || "";
  }

  return (
    <li className="flex items-center justify-between rounded-md bg-secondary p-2">
      <div className="flex items-center gap-2">
        {courseUnitMaterialIcons[courseUnitMaterial.type]}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{courseUnitMaterial.title}</TooltipTrigger>
            <TooltipContent>
              <p>{courseUnitMaterial.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div>
        <CourseUnitMaterialAlertDialog
          courseUnitMaterialId={courseUnitMaterial.id}
        >
          <Button size="sm" variant="ghost">
            <CircleX />
          </Button>
        </CourseUnitMaterialAlertDialog>

        <FormDialog
          actionType="edit-course-unit-material"
          courseUnitMaterial={courseUnitMaterial}
        >
          <Button size="sm" variant="ghost">
            <Edit />
          </Button>
        </FormDialog>

        <Button size="sm" variant="ghost" asChild>
          <Link to={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink />
          </Link>
        </Button>
      </div>
    </li>
  );
}
