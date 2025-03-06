import { User } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { useUser } from "@/hooks/contexts/useUser";
import env from "@/lib/env";
import { cn } from "@/lib/utils";

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
        <User className="h-5 w-5" />
      </AvatarFallback>
    </Avatar>
  );
}
