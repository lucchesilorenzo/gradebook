import { fetchData } from "@/lib/api-client";
import { UserSettings } from "@/lib/types/user-types";
import { useQuery } from "@tanstack/react-query";

export function useUserSettings() {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: (): Promise<UserSettings> => fetchData("/users/settings"),
  });
}
