import { fetchData } from "@/lib/api-client";
import { UserSettings } from "@/types/user-types";
import { useQuery } from "@tanstack/react-query";

export function useGetUserSettings() {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: (): Promise<UserSettings> => fetchData("/users/settings"),
  });
}
