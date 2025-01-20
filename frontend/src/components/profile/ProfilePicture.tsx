import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ProfilePictureProps = {
  className?: string;
};

export default function ProfilePicture({ className }: ProfilePictureProps) {
  return (
    <Avatar className={(cn("h-10 w-10"), className)}>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
