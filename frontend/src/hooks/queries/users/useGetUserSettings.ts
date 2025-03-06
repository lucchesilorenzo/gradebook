import { useQuery } from "@tanstack/react-query";

import { fetchData } from "@/lib/api-client";
import { UserSettings } from "@/types/user-types";

export function useGetUserSettings() {
  return useQuery({
    queryKey: ["user-settings"],
    queryFn: (): Promise<UserSettings> => fetchData("/users/settings"),
  });
}
