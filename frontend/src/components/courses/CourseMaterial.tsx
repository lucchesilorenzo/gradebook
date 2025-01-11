import { courseMaterialIcons } from "@/lib/data";
import { type CourseMaterial } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import env from "@/lib/env";

type CourseMaterialProps = {
  material: CourseMaterial;
};

export default function CourseMaterial({ material }: CourseMaterialProps) {
  let link;

  switch (material.type) {
    case "PDF":
      link = `${env.VITE_BASE_URL}/storage/${material.file}`;
      break;
    default:
      link = material.url || "";
  }

  return (
    <li className="flex items-center justify-between rounded-md bg-secondary p-2">
      <div className="flex items-center gap-2">
        {courseMaterialIcons[material.type]}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>{material.title}</TooltipTrigger>
            <TooltipContent>
              <p>{material.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <Button size="sm" variant="ghost" asChild>
        <Link to={link} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>
    </li>
  );
}
