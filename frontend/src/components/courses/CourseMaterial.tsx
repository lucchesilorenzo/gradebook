import { ExternalLink, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function CourseMaterial() {
  return (
    <li className="flex items-center justify-between rounded-md bg-secondary p-2">
      <div className="flex items-center gap-2">
        <FileText />
        <span>Introduction to React</span>
      </div>
      <Button size="sm" variant="ghost" asChild>
        <Link to="#" target="_blank" rel="noopener noreferrer">
          <ExternalLink className="h-4 w-4" />
        </Link>
      </Button>
    </li>
  );
}
