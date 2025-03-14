import { LibraryBig } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "../ui/button";

type AppLogoProps = {
  onOpenChange?: () => void;
};

export default function AppLogo({ onOpenChange }: AppLogoProps) {
  return (
    <Link to="/" className="flex items-center space-x-3" onClick={onOpenChange}>
      <Button size="icon" className="hover:bg-primary">
        <LibraryBig />
      </Button>
      <span className="text-lg font-bold">GradeBook</span>
    </Link>
  );
}
