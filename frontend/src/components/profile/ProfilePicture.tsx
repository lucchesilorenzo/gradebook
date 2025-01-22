import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { User } from "lucide-react";
import env from "@/lib/env";

type ProfilePictureProps = {
  className?: string;
};

export default function ProfilePicture({ className }: ProfilePictureProps) {
  const { userSettings } = useUser();

  return (
    <Avatar className={(cn("h-10 w-10"), className)}>
      <AvatarImage
        src={`${env.VITE_BASE_URL}/storage/${userSettings.image}`}
        alt={`${userSettings.first_name}'s profile picture`}
      />
      <AvatarFallback>
        <User />
      </AvatarFallback>
    </Avatar>
  );
}
