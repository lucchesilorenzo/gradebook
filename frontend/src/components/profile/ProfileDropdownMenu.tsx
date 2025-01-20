import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogOut } from "@/hooks/mutations/auth/useLogOut";
import ProfilePicture from "./ProfilePicture";
import { Link } from "react-router-dom";
import { useState } from "react";

type ProfileDropdownMenuProps = {
  type: "desktop" | "mobile";
};

export default function ProfileDropdownMenu({
  type,
}: ProfileDropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { mutateAsync: logOut } = useLogOut();

  async function handleLogOut() {
    await logOut();
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <ProfilePicture className={`${type === "mobile" ? "h-8 w-8" : ""}`} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/teacher/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogOut}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
