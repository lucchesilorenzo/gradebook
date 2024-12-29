import { LibraryBig } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Button size="icon" className="hover:bg-primary">
        <LibraryBig />
      </Button>
      <span className="text-lg font-bold">GradeBook</span>
    </Link>
  );
}
