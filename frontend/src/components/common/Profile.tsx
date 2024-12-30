import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogOut } from "@/hooks/mutations/auth/useLogOut";

type ProfileProps = {
  type: "desktop" | "mobile";
};

export default function Profile({ type }: ProfileProps) {
  const { mutateAsync: logOut } = useLogOut();

  async function handleLogOut() {
    await logOut();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className={`${type === "mobile" ? "h-8 w-8" : ""}`}>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem onSelect={handleLogOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
