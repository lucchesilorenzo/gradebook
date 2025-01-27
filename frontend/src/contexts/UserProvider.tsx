import { getPrivateEcho } from "@/lib/echo";
import { UserSettings } from "@/lib/types";
import React, { createContext, useEffect } from "react";
import { toast } from "sonner";

type Notification = {
  id: string;
  type: string;
  course_name: string;
  schedule_id: string;
  message: string;
  start_datetime: string;
};

type UserProviderProps = {
  children: React.ReactNode;
  userSettings: UserSettings;
};

type UserContext = {
  userSettings: UserSettings;
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({
  children,
  userSettings,
}: UserProviderProps) {
  useEffect(() => {
    const privateEcho = getPrivateEcho();

    const channel = privateEcho.private(`App.Models.User.${userSettings.id}`);

    channel.notification((data: Notification) => {
      toast.warning(data.message);
      console.log(data);
    });

    return () => {
      privateEcho.leave(`App.Models.User.${userSettings.id}`);
    };
  }, [userSettings.id]);

  return (
    <UserContext.Provider value={{ userSettings }}>
      {children}
    </UserContext.Provider>
  );
}
