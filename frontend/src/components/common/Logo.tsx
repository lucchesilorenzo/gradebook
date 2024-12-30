import { LibraryBig } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

type LogoProps = {
  onOpenChange?: () => void;
};

export default function Logo({ onOpenChange }: LogoProps) {
  return (
    <Link to="/" className="flex items-center space-x-3" onClick={onOpenChange}>
      <Button size="icon" className="hover:bg-primary">
        <LibraryBig />
      </Button>
      <span className="text-lg font-bold">GradeBook</span>
    </Link>
  );
}
