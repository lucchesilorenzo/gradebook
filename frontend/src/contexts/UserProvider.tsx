import { useGetUserNotifications } from "@/hooks/queries/users/useGetUserNotifications";
import { getPrivateEcho } from "@/lib/echo";
import { UserSettings } from "@/types";
import React, { createContext, useEffect } from "react";
import { toast } from "sonner";

type Notification = {
  id: string;
  type: string;
  message: string;
};

type UserProviderProps = {
  children: React.ReactNode;
  userSettings: UserSettings;
};

type UserContext = {
  userSettings: UserSettings;
  notifications?: number;
};

export const UserContext = createContext<UserContext | null>(null);

export default function UserProvider({
  children,
  userSettings,
}: UserProviderProps) {
  const { data, refetch } = useGetUserNotifications();

  useEffect(() => {
    const privateEcho = getPrivateEcho();

    const channel = privateEcho.private(`App.Models.User.${userSettings.id}`);

    channel.notification((data: Notification) => {
      toast.warning(data.message);
      refetch();
    });

    return () => {
      privateEcho.leave(`App.Models.User.${userSettings.id}`);
    };
  }, [userSettings.id, refetch]);

  return (
    <UserContext.Provider
      value={{
        userSettings,
        notifications: data?.unread_notifications,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
