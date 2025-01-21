import { UserContext } from "@/contexts/UserProvider";
import { useContext } from "react";

export function useUser() {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider.");
  }

  return context;
}
