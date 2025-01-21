import { UserSettings } from "@/lib/types";
import React, { createContext } from "react";

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
  return (
    <UserContext.Provider value={{ userSettings }}>
      {children}
    </UserContext.Provider>
  );
}
