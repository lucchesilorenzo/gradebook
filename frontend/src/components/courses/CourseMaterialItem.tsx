import { courseMaterialIcons } from "@/lib/data";
import { type CourseMaterial } from "@/lib/types";
import { Edit, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import env from "@/lib/env";
import FormDialog from "../common/FormDialog";

type CourseMaterialProps = {
  courseMaterial: CourseMaterial;
};

export default function CourseMaterialItem({
  courseMaterial,
}: CourseMaterialProps) {
  let link;

  switch (courseMaterial.type) {
    case "PDF":
      link = `${env.VITE_BASE_URL}/storage/${courseMaterial.file}`;
      break;
    default:
      link = courseMaterial.url || "";
  }

  return (
    <li className="flex items-center justify-between rounded-md bg-secondary p-2">
      <div className="flex items-center gap-2">
        {courseMaterialIcons[courseMaterial.type]}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{courseMaterial.title}</TooltipTrigger>
            <TooltipContent>
              <p>{courseMaterial.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div>
        <FormDialog
          actionType="edit-course-material"
          courseMaterial={courseMaterial}
        >
          <Button size="sm" variant="ghost">
            <Edit />
          </Button>
        </FormDialog>

        <Button size="sm" variant="ghost" asChild>
          <Link to={link} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </li>
  );
}
