import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type ProfilePictureProps = {
  className?: string;
};

export default function ProfilePicture({ className }: ProfilePictureProps) {
  const { userSettings } = useUser();

  const initials = `${userSettings.first_name[0]}${userSettings.last_name[0]}`;

  return (
    <Avatar className={(cn("h-10 w-10"), className)}>
      <AvatarImage
        src={userSettings.image || ""}
        alt={`${userSettings.first_name}'s profile picture`}
      />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
}
